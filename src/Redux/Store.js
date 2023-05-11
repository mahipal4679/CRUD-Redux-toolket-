import{configureStore} from '@reduxjs/toolkit'
import PostSlice from './Feature/PostSlice'

export default configureStore({
    reducer:{
        app:PostSlice,
    },
})