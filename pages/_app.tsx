import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import Link from 'next/link';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import ClientSideRenderer from '../components/ClientSideRender';
import { store, StoreContext } from '../src/state/stores/RootStore';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ClientSideRenderer>
      <StoreContext.Provider value={store}>
      <Layout>
        {/* <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
          </Menu>
        </Header> */}
        <Layout>
          <Sider width={130} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >

              
              <Menu.Item key="1">
                <Link href="/projects">Projects</Link>
              </Menu.Item> 

              {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Component {...pageProps} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      </StoreContext.Provider>
    </ClientSideRenderer>
  );
}
export default MyApp
