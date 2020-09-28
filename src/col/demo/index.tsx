import * as preact from 'preact';
import { Row } from '../../row';
import { Col } from '../../col';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../demos/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-layout');

export class LayoutRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Layout" type="layout" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Row>
              <Col span="8">span: 8</Col>
              <Col span="8">span: 8</Col>
              <Col span="8">span: 8</Col>
            </Row>
            <Row>
              <Col span="4">span: 4</Col>
              <Col span="10" offset="4">
                offset: 4, span: 10
              </Col>
            </Row>
            <Row>
              <Col offset="12" span="12">
                offset: 12, span: 12
              </Col>
            </Row>
          </section>

          <section>
            <h2>Column Spacing</h2>
            <Row gutter="20">
              <Col span="8">span: 8</Col>
              <Col span="8">span: 8</Col>
              <Col span="8">span: 8</Col>
            </Row>
          </section>

          <section>
            <h2>Flex Layout</h2>
            <Row type="flex">
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
            </Row>
            <Row type="flex" justify="end">
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
              <Col span="6">span: 6</Col>
            </Row>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
