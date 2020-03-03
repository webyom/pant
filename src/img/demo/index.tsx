import * as preact from 'preact';
import { Row } from '../../row';
import { Col } from '../../col';
import { Img } from '../../img';
import { Icon } from '../../icon';
import { Loading } from '../../loading';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

const bem = createBEM('demo-img');

export class ImgRouteComponent extends preact.Component {
  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Image" type="img" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Img width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </section>

          <section>
            <h2>Basic Usage</h2>
            <Row gutter="20">
              <Col span="8">
                <Img width="100%" height="27vw" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="text">contain</div>
              </Col>
              <Col span="8">
                <Img width="100%" height="27vw" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="text">cover</div>
              </Col>
              <Col span="8">
                <Img width="100%" height="27vw" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="text">fill</div>
              </Col>
            </Row>
            <Row gutter="20">
              <Col span="8">
                <Img width="100%" height="27vw" fit="none" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="text">none</div>
              </Col>
              <Col span="8">
                <Img width="100%" height="27vw" fit="scale-down" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="text">scale-down</div>
              </Col>
            </Row>
          </section>

          <section>
            <h2>Round</h2>
            <Row gutter="20">
              <Col span="8">
                <Img width="100%" height="27vw" fit="contain" src="https://img.yzcdn.cn/vant/cat.jpeg" round />
                <div class="text">contain</div>
              </Col>
              <Col span="8">
                <Img width="100%" height="27vw" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" round />
                <div class="text">cover</div>
              </Col>
              <Col span="8">
                <Img width="100%" height="27vw" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" round />
                <div class="text">fill</div>
              </Col>
            </Row>
            <Row gutter="20">
              <Col span="8">
                <Img width="100%" height="27vw" fit="none" src="https://img.yzcdn.cn/vant/cat.jpeg" round />
                <div class="text">none</div>
              </Col>
              <Col span="8">
                <Img width="100%" height="27vw" fit="scale-down" src="https://img.yzcdn.cn/vant/cat.jpeg" round />
                <div class="text">scale-down</div>
              </Col>
            </Row>
          </section>

          <section>
            <h2>Loading</h2>
            <Row gutter="20">
              <Col span="8">
                <Img
                  width="100%"
                  height="27vw"
                  fit="none"
                  src="http://not-exist"
                  loadingNode={<Icon name="photo-o" size="22" />}
                  errorNode={<Icon name="photo-o" size="22" />}
                />
                <div class="text">Default Tip</div>
              </Col>
              <Col span="8">
                <Img
                  width="100%"
                  height="27vw"
                  fit="none"
                  src="http://not-exist"
                  loadingNode={<Loading type="spinner" size="20" />}
                  errorNode={<Loading type="spinner" size="20" />}
                />
                <div class="text">Custom Tip</div>
              </Col>
            </Row>
          </section>

          <section>
            <h2>Error</h2>
            <Row gutter="20">
              <Col span="8">
                <Img width="100%" height="27vw" fit="none" src="http://not-exist" />
                <div class="text">Default Tip</div>
              </Col>
              <Col span="8">
                <Img width="100%" height="27vw" fit="none" src="http://not-exist" errorNode="Load failed" />
                <div class="text">Custom Tip</div>
              </Col>
            </Row>
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
