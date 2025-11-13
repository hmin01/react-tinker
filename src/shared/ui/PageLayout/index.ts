import { PageBody } from "./PageBody";
import { PageHeader } from "./PageHeader";
import { PageLayout as BaseLayout, type PageLayoutProps } from "./PageLayout";

export interface PageLayoutComponent extends React.FC<PageLayoutProps> {
  Header: typeof PageHeader;
  Body: typeof PageBody;
}

export const PageLayout = BaseLayout as PageLayoutComponent;
PageLayout.Header = PageHeader;
PageLayout.Body = PageBody;
