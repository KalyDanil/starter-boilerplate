import { 
  DashboardOutlined, 
  FileTextOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  PictureOutlined,
  GiftOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  MobileOutlined,
  FormOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const mainNavTree = [{
  key: 'main',
  path: `${APP_PREFIX_PATH}/main`,
  title: 'sidenav.main',
  icon: '',
  breadcrumb: false,
  submenu: [
    {
      key: 'main-dashboard',
      path: `${APP_PREFIX_PATH}/main/dashboard`,
      title: 'sidenav.main.dashboard',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-planner',
      path: `${APP_PREFIX_PATH}/main/planner`,
      title: 'sidenav.main.planner',
      icon: FormOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-catalog',
      path: `${APP_PREFIX_PATH}/main/catalog`,
      title: 'sidenav.main.catalog',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'main-catalog-products',
          path: `${APP_PREFIX_PATH}/main/catalog/products`,
          title: 'sidenav.main.catalog.products',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-catalog-categories',
          path: `${APP_PREFIX_PATH}/main/catalog/categories`,
          title: 'sidenav.main.catalog.categories',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-catalog-collections',
          path: `${APP_PREFIX_PATH}/main/catalog/collections`,
          title: 'sidenav.main.catalog.collections',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-catalog-combo',
          path: `${APP_PREFIX_PATH}/main/catalog/combo`,
          title: 'sidenav.main.catalog.combo',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'main-orders',
      path: `${APP_PREFIX_PATH}/main/orders`,
      title: 'sidenav.main.orders',
      icon: ShoppingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-clients',
      path: `${APP_PREFIX_PATH}/main/clients`,
      title: 'sidenav.main.clients',
      icon: UserOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'main-clients-list',
          path: `${APP_PREFIX_PATH}/main/clients/list`,
          title: 'sidenav.main.clients.list',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-clients',
          path: `${APP_PREFIX_PATH}/main/clients/groups`,
          title: 'sidenav.main.clients.groups',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'main-banners',
      path: `${APP_PREFIX_PATH}/main/banners`,
      title: 'sidenav.main.banners',
      icon: PictureOutlined ,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-promoсodes',
      path: `${APP_PREFIX_PATH}/main/promoсodes`,
      title: 'sidenav.main.promoсodes',
      icon: GiftOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-offlinePoints',
      path: `${APP_PREFIX_PATH}/main/offlinePoints`,
      title: 'sidenav.main.offlinePoints',
      icon: ShopOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'main-offlinePoints-addresses',
          path: `${APP_PREFIX_PATH}/main/offlinePoints/addresses`,
          title: 'sidenav.main.offlinePoints.addresses',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-offlinePoints-geofences',
          path: `${APP_PREFIX_PATH}/main/offlinePoints/geofences`,
          title: 'sidenav.main.offlinePoints.geofences',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'main-employees',
      path: `${APP_PREFIX_PATH}/main/employees`,
      title: 'sidenav.main.employees',
      icon: UsergroupAddOutlined ,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-mailings',
      path: `${APP_PREFIX_PATH}/main/mailings`,
      title: 'sidenav.main.mailings',
      icon: MailOutlined  ,
      breadcrumb: false,
      submenu: []
    },
  ]
}]

const systemicNavTree = [{
  key: 'systemic',
  path: `${APP_PREFIX_PATH}/systemic`,
  title: 'sidenav.systemic',
  icon: '',
  breadcrumb: true,
  submenu: [
    {
      key: 'systemic-settings',
      path: `${APP_PREFIX_PATH}/systemic/settings`,
      title: 'sidenav.systemic.settings',
      icon: SettingOutlined ,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'systemic-mobileApp',
      path: `${APP_PREFIX_PATH}/systemic/mobileApp`,
      title: 'sidenav.systemic.mobileApp',
      icon: MobileOutlined ,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'systemic-logs',
      path: `${APP_PREFIX_PATH}/systemic/documentation/logs`,
      title: 'sidenav.systemic.logs',
      icon: FileTextOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...mainNavTree,
  ...systemicNavTree
]

export default navigationConfig;
