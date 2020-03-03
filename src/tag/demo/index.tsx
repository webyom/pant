import * as preact from 'preact';
import { Tag } from '../../tag';
import { createBEM } from '../../utils/bem';
import { NavBar } from '../../_site/scripts/components/nav-bar';
import './index.scss';

type TagRouteComponentState = {
  showPrimary: boolean;
  showSuccess: boolean;
};

const bem = createBEM('demo-tag');

export class TagRouteComponent extends preact.Component<any, TagRouteComponentState> {
  state = {
    showPrimary: true,
    showSuccess: true,
  };

  render(): preact.JSX.Element {
    return (
      <preact.Fragment>
        <NavBar title="Tag" type="tag" />
        <div className={bem()}>
          <section>
            <h2>Basic Usage</h2>
            <Tag>Tag</Tag>
            <Tag type="primary">Tag</Tag>
            <Tag type="success">Tag</Tag>
            <Tag type="danger">Tag</Tag>
            <Tag type="warning">Tag</Tag>
          </section>

          <section>
            <h2>Round Style</h2>
            <Tag round>Tag</Tag>
            <Tag round type="primary">
              Tag
            </Tag>
            <Tag round type="success">
              Tag
            </Tag>
            <Tag round type="danger">
              Tag
            </Tag>
            <Tag round type="warning">
              Tag
            </Tag>
          </section>

          <section>
            <h2>Mark Style</h2>
            <Tag mark>Tag</Tag>
            <Tag mark type="primary">
              Tag
            </Tag>
            <Tag mark type="success">
              Tag
            </Tag>
            <Tag mark type="danger">
              Tag
            </Tag>
            <Tag mark type="warning">
              Tag
            </Tag>
          </section>

          <section>
            <h2>Plain Style</h2>
            <Tag plain>Tag</Tag>
            <Tag plain type="primary">
              Tag
            </Tag>
            <Tag plain type="success">
              Tag
            </Tag>
            <Tag plain type="danger">
              Tag
            </Tag>
            <Tag plain type="warning">
              Tag
            </Tag>
          </section>

          <section>
            <h2>Custom Color</h2>
            <Tag color="#f2826a">Tag</Tag>
            <Tag color="#f2826a" plain>
              Tag
            </Tag>
            <Tag color="#7232dd">Tag</Tag>
            <Tag color="#7232dd" plain>
              Tag
            </Tag>
            <Tag color="#ffe1e1" text-color="#ad0000">
              Tag
            </Tag>
          </section>

          <section>
            <h2>Custom Size</h2>
            <Tag type="success">Tag</Tag>
            <Tag type="success" size="medium">
              Tag
            </Tag>
            <Tag type="success" size="large">
              Tag
            </Tag>
          </section>

          <section>
            <h2>Closeable</h2>
            {((): preact.JSX.Element => {
              if (this.state.showPrimary) {
                return (
                  <Tag
                    type="primary"
                    size="medium"
                    closeable
                    onClose={(): void => this.setState({ showPrimary: false })}
                  >
                    Tag
                  </Tag>
                );
              }
            })()}
            {((): preact.JSX.Element => {
              if (this.state.showSuccess) {
                return (
                  <Tag
                    type="success"
                    size="medium"
                    closeable
                    onClose={(): void => this.setState({ showSuccess: false })}
                  >
                    Tag
                  </Tag>
                );
              }
            })()}
          </section>
        </div>
      </preact.Fragment>
    );
  }
}
