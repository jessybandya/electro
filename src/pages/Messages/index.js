import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'

function Messages() {
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>
    <h1>Messages</h1>
    </SoftTypography>
    <Footer/>
    </DashboardLayout>
  )
}

export default Messages