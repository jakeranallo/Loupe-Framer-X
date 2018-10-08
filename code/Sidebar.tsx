import * as React from 'react';
import { PropertyControls, ControlType, Frame } from 'framer';
import styled from 'styled-components';

// Define type of property
interface Props {
  items: number;
  segmentHeight: number;
}

const FlexContainer = styled(Frame)`
  width: 100%;
  height: 100%;
  background: ${props => props.bg} !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-left: 1px solid #252C34;
`;

const Segment = styled.div`
  background: ${props => props.bg};
  transition: flex 0.2s ease-out;
  justify-self: flex-start;
  /* max-height: ${props => `${props.height}px`}; */
  height: ${props => `${props.height}px`};
  overflow: hidden !important;
  transition: 0.4s cubic-bezier(0.2, 0.2, 0.2, 1);
  &>div{
    transform: none !important;
    position: relative !important;
    width: 100% !important;
  }
  &.expanded {
    height: ${props=> `${props.fullHeight}px`};
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.07);
  }
`;
const SegmentHeader = styled.div`
  display: flex;
  align-items: center;
  height: ${props => `${props.height}px`};
  background-color: ${props => props.bg};
  box-shadow: 0 -1px 0 0 #252C34 inset;
  color: #fff;
  padding-left: 16px;
  cursor: pointer;

  &:hover {
    background: #384052;
  }

  p {
      text-transform: uppercase;
      font-size: 10pt;
      font-weight: bold;
      letter-spacing: 1.2px;
    }
`;

export class Sidebar extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    segmentHeight: 32,
    segmentHeaderColor: '#07c',
    segmentBackgroundColor: '#aaa',
    backgroundColor: '#ccc',
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    segmentHeight: { type: ControlType.Number, title: 'Segment size' },
    backgroundColor: { type: ControlType.Color, title: "Background color"},
    segmentHeaderColor: { type: ControlType.Color, title: "Segment header color"},
    segmentBackgroundColor: { type: ControlType.Color, title: "Segment background color"}
  };

  constructor(props){
    super(props);
    this.state = {
      fullHeight: 100
    }
  }


  toggleRow(e) {
    const openedRow = document.querySelector('.expanded');
    const clickedRow = e.currentTarget.parentNode;

    if (openedRow) openedRow.classList.remove('expanded');

    if (openedRow !== clickedRow) clickedRow.classList.add('expanded');
  }

  componentDidMount(){
    if (this.props.children[0] !== undefined){
      this.setState({
        fullHeight: (this.props.height - ((this.props.children[0].props.children.length-1) * this.props.segmentHeight))
      })
    }
  }

  componentDidUpdate(){
    console.info('update')
  }

  render() {
    let arr = [];
    if (this.props.children[0] !== undefined){
      arr = this.props.children[0].props.children;
    }
    return (
      <FlexContainer bg={this.props.backgroundColor} height={this.props.height} width={this.props.width}>
        {arr.map((item,i) => {
          console.log(item)
          return (
            <Segment bg={this.props.segmentBackgroundColor} width={this.props.width} height={this.props.segmentHeight} fullHeight={this.state.fullHeight} key={item.props.id}>
              <SegmentHeader height={this.props.segmentHeight} bg={this.props.segmentHeaderColor} onClick={this.toggleRow}>
              <p>hello world</p>
              </SegmentHeader>
              {item}
            </Segment>
          )
          })
        }
      </FlexContainer>
    );
  }
}
