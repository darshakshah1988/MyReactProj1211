import { Route, Switch, useRouteMatch } from 'react-router-dom';
import WithMockData from '../../mocks/WithMockData';
import InnerPage from '../../components/InnerPage';
import GeneMagmaPage from './GeneMagmaPage';
import L2GPage from './L2GPage';
import LocusPage from './LocusPage';
import GenePage from './GenePage';
import StudyLocusPage from './StudyLocusPage';

const withMockData = props => () => <WithMockData {...props} />;

const Trial = () => (
  <InnerPage
    {...{
      title: 'Gene Centric Page',
      tabs: {
        locustToGene: {
          label: 'Locus to Gene',
          component: withMockData({
            query: 'gene',
            Component: L2GPage,
          }),
        },
        colocalization: {
          label: 'Gene Magma',
          component: withMockData({
            query: 'gene-magma',
            Component: GeneMagmaPage,
          }),
        },
        locus: {
          label: 'Locus',
          component: withMockData({
            query: 'locus',
            Component: LocusPage,
          }),
        },
        BaselineExpression: {
          label: 'BaseLine Expression',
          component: withMockData({
            query: 'gene',
            component: GenePage,
          }),
        },
      },
    }}
  />
);

export default () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Trial} />
      <Route path={`${path}/gene/:geneId`} component={GenePage} />
      <Route
        path={`${path}/study-locus/:studyId/:variantId`}
        component={StudyLocusPage}
      />
    </Switch>
  );
};
