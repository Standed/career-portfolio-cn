#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'

const root = process.cwd()
const allowedMedia = new Set([
  'hero-architecture.webp',
  'workflow-still-life.webp',
  'contact-light-seam.webp',
])
const textExtensions = new Set([
  '.css', '.html', '.js', '.json', '.md', '.mjs', '.mts', '.ts', '.tsx', '.txt', '.yml', '.yaml',
])
const ignoredDirectories = new Set(['.git', 'node_modules', 'dist'])
const errors = []

function fail(message) {
  errors.push(message)
}

function pathFromRoot(file) {
  return relative(root, file).split(sep).join('/')
}

function walk(directory, options = {}) {
  if (!existsSync(directory)) return []
  const files = []
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = resolve(directory, entry.name)
    if (entry.isDirectory()) {
      if (!options.includeIgnored && ignoredDirectories.has(entry.name)) continue
      files.push(...walk(fullPath, options))
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }
  return files
}

function hasUnsafeDirectory(directory) {
  return walk(directory).filter((file) => /(^|\/)(local-review|restricted)(\/|$)/i.test(pathFromRoot(file)))
}

function checkMedia(directory, label) {
  if (!existsSync(directory)) {
    fail(`${label} 不存在：${pathFromRoot(directory)}`)
    return
  }

  const found = walk(directory).map((file) => relative(directory, file).split(sep).join('/'))
  const unexpected = found.filter((file) => !allowedMedia.has(file))
  const missing = [...allowedMedia].filter((file) => !found.includes(file))

  if (unexpected.length) fail(`${label} 含未获准媒体：${unexpected.join(', ')}`)
  if (missing.length) fail(`${label} 缺少获准媒体：${missing.join(', ')}`)
}

function isDangerousFilename(file) {
  const normalized = pathFromRoot(file)
  const name = normalized.split('/').at(-1).toLowerCase()
  if (/^\.env(?:$|\.(?!example$|sample$|template$))/i.test(name)) return true
  return /^(id_rsa|id_dsa|id_ecdsa|id_ed25519|.*\.(pem|p12|pfx)|.*\.(key|keystore))$/i.test(name)
}

function looksLikeExample(text, index) {
  const context = text.slice(Math.max(0, index - 160), index + 160).toLowerCase()
  return /example|placeholder|replace[-_ ]?me|redacted|not[-_ ]?a[-_ ]?real|示例|占位|脱敏/.test(context)
}

function hasPrivateMaterial(text) {
  const keyBlock = /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----\s*(?:[A-Za-z0-9+/=]{20,}\s*){3,}-----END (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/m
  if (keyBlock.test(text)) return '私钥区块'

  const tokenPatterns = [
    /\bAKIA[0-9A-Z]{16}\b/g,
    /\bgh[pousr]_[A-Za-z0-9_]{30,}\b/g,
    /\bgithub_pat_[A-Za-z0-9_]{40,}\b/g,
    /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g,
    /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g,
  ]
  for (const pattern of tokenPatterns) {
    const match = pattern.exec(text)
    if (match && !looksLikeExample(text, match.index)) return '疑似可用访问令牌'
  }
  return null
}

function checkSecrets() {
  for (const file of walk(root)) {
    const displayPath = pathFromRoot(file)
    if (isDangerousFilename(file)) {
      fail(`发现不应随开源发布的密钥文件名：${displayPath}`)
      continue
    }

    const extension = displayPath.slice(displayPath.lastIndexOf('.')).toLowerCase()
    if (!textExtensions.has(extension) || statSync(file).size > 1024 * 1024) continue
    const contents = readFileSync(file, 'utf8')
    const finding = hasPrivateMaterial(contents)
    if (finding) fail(`${displayPath} 含${finding}`)
  }
}

function checkRelease() {
  const publicDir = resolve(root, 'public')
  const distDir = resolve(root, 'dist')
  const publicUnsafe = hasUnsafeDirectory(publicDir)
  const distUnsafe = hasUnsafeDirectory(distDir)
  if (publicUnsafe.length) fail(`public 中出现 local-review/restricted 内容：${publicUnsafe.map(pathFromRoot).join(', ')}`)
  if (distUnsafe.length) fail(`dist 中出现 local-review/restricted 内容：${distUnsafe.map(pathFromRoot).join(', ')}`)

  checkMedia(resolve(publicDir, 'media'), 'public/media')
  checkMedia(resolve(distDir, 'media'), 'dist/media')

  for (const required of ['index.html', 'site.webmanifest', 'robots.txt']) {
    if (!existsSync(resolve(distDir, required))) fail(`dist 缺少发布必需文件：${required}`)
  }
  checkSecrets()

  if (errors.length) {
    console.error('发布前检查未通过：')
    for (const error of errors) console.error(`- ${error}`)
    process.exitCode = 1
    return
  }
  console.log(`发布前检查通过：${[...allowedMedia].join(', ')}`)
}

checkRelease()
