import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

// Import components
import AdminLoginComponent from '../components/AdminLoginComponent/adminLoginComponent'

export default function AdminLogin() {
  return (
    <>
      <h1>CBS Burger: Admin Login</h1>
      <AdminLoginComponent/>
    </>
  )
}
