import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

// Import layout
import LayoutComponent from '../Layout/customerLayout'

// Import components
import AdminRegistrationComponent from '../components/AdminRegistration/adminRegistrationComponent'
import Footer from '../components/FooterComponent/footerComponent'

const AdminRegistration: React.FC = () => {
  return (
    <>
      <AdminRegistrationComponent/>
      <Footer/>
    </>
  )
}

export default AdminRegistration;
