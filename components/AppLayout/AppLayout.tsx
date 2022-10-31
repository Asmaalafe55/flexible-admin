import { Layout, Space, Select, Typography, Button } from 'antd'

const { Header, Content } = Layout
const { Title } = Typography
import style from './authLayout.module.scss'
import LayoutSider from '@/components/LayoutSider'

import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  // usually the dark mode is fetched from the recoil state
  const darkMode = true

  //   const { mutate: logout } = useMutation(
  //     () => {
  //       return axios.get(`/auth/logout`)
  //     },
  //     {
  //       onSuccess: () => {
  //         router.push('/auth/login')
  //       },
  //       onError: () => {
  //         console.log('error')
  //       }
  //     }
  //   )

  const hideLayoutSpacing = useMemo(() => {
    if (router.pathname.includes('documents') && router.pathname !== '/documents/list') {
      return true
    }

    return false
  }, [router])

  return (
    <Layout>
      <Header className={darkMode ? style.darkModeHeader : style.lightModeHeader}>
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={2} className={darkMode ? style.darkHeaderTitle : style.lightHeaderTitle}>
            Flexible
          </Title>
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Tab 1</Menu.Item>
            <Menu.Item key="2">Tab 2</Menu.Item>
            <Menu.Item key="3">Tab 3</Menu.Item>
          </Menu> */}
          <Space>
            {/* <Button onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Light' : 'Dark'} mode</Button> */}
            <Select style={{ width: '100px' }}>
              <option value="en">English</option>
              {/* <option value="he">עברית</option> */}
              {/* <option value="ar">عربية</option> */}
            </Select>
            <Button
              onClick={() => {
                // logout(null)
              }}
            >
              Logout
            </Button>
          </Space>
        </Space>
      </Header>

      <Layout className="site-layout" style={{ minHeight: '90vh' }}>
        <LayoutSider darkMode={darkMode} />
        <Content style={{ margin: !hideLayoutSpacing ? '0 16px' : '' }}>
          <div style={{ padding: !hideLayoutSpacing ? '24px 12px' : '', minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
