import { Menu, Layout } from 'antd'
import { useState } from 'react'
import { TeamOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

const { Sider } = Layout

const LayoutSider = ({ darkMode }: { darkMode: boolean }) => {
  const [collapse, setCollapse] = useState(false)
  const router = useRouter()

  return (
    <Sider collapsible collapsed={collapse} onCollapse={setCollapse} theme={darkMode ? 'dark' : 'light'}>
      <Menu theme={darkMode ? 'dark' : 'light'} defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" onClick={() => router.push('/')} icon={<BarChartOutlined />} style={{ marginTop: 0 }}>
          Dashboard
        </Menu.Item>

        <Menu.Item
          key="2"
          onClick={() => router.push('/questions/list')}
          icon={<TeamOutlined />}
          style={{ marginTop: 0 }}
        >
          Questions
        </Menu.Item>

        <Menu.Item key="4" onClick={() => router.push('/templates')} icon={<TeamOutlined />} style={{ marginTop: 0 }}>
          Templates
        </Menu.Item>

        <Menu.Item
          key="3"
          onClick={() => router.push('/documents/settings')}
          icon={<SettingOutlined />}
          style={{ marginTop: 0 }}
        >
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default LayoutSider
