import { Link, useLocation } from '@remix-run/react';

import styles from "./styles.module.css";
import { TitleBar } from '@shopify/app-bridge-react';

export default function Header({title = "Home"}){

  const location = useLocation();

    return <div className={styles.header}>
        <TitleBar title={title} className={styles.header}>
          {location.pathname !== '/app' && <Link to="/app">All</Link>}
          <Link variant="primary" target="blank" to={"https://admin.shopify.com/store/sample-test-apps/charges/panorama-viewer/pricing_plans"}>Upgrade</Link>
          <Link to="/app/create">Create New</Link>
          <Link to="/app/create/">Support</Link>
        </TitleBar>
    </div>
}