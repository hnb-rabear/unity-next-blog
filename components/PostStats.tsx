'use client'

import { viewPostAction } from 'app/blog/[...slug]/actions'
import { useEffect, useState } from 'react'
import SessionManager from '../lib/sessionManager'

function PostStats({ slug }) {
  const sessionManager = SessionManager.getInstance()

  const updateViewPostCache = () => {
    const temp = sessionManager.get('viewPostCache')
    let viewPostCache = temp ? JSON.parse(temp) : {}

    if (!viewPostCache[slug]) {
      viewPostAction(slug)

      viewPostCache[slug] = true
      sessionManager.set('viewPostCache', JSON.stringify(viewPostCache))
    }
  }

  useEffect(() => {
    updateViewPostCache()
  }, [slug])

  useEffect(() => {
    if (sessionManager.hasExpired()) {
      sessionManager.clear()
    }
  }, [])
  const expirationTime = new Date(SessionManager.getInstance().expirationTime).toLocaleString()
  console.log('session expiration time: ', expirationTime)

  return <></>
}
export default PostStats
