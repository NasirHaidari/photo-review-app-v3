import { useEffect } from 'react'
import { db } from '../firebase'

const useDeleteAlbum = (album) => {
  useEffect(() => {
    if (!album) {
      return
    }

    ;(async () => {
      await db.collection('albums').doc(album.id).delete()
    })()
  }, [album])

  return {}
}

export default useDeleteAlbum
