import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import styled from "styled-components";
import Draggable from 'react-draggable';
import FeatherIcon from "feather-icons-react";
import WebfontLoader from '@dr-kobros/react-webfont-loader';

const config = {
    google: {
      families: ['Montserrat'],
    }
  };

  const callback = status => {
    // I could hook the webfont status to for example Redux here.
  };

const StageContainer = styled.div`
    background: #373E49;
    height: 100%;
    color: white;
    padding: 20px;
    font-size: 18px;
    font-family: 'Montserrat', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: thin;
    border-radius: 8px;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.16);
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: -webkit-grab;
    

    &:hover {
        background: ${props => props.color};
        padding-left: 10px;
        transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    &:active {
        background: ${props => props.color};
        transform: scale(1.1, 1.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        filter: brightness(120%);
    }

    p {
        position: relative;
        left: 50px;
    }
`

const ColorBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 56px;
    background: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
`

// Define type of property
interface Props {
    icon: string;
    text: string;
    color: string;
}


export class Course extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        text: "New Stage",
        color: "blue",
        icon: "camera",
        
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        text: { type: ControlType.String, title: "Text" },
        color: { type: ControlType.Color, title: "Background Color" },
        icon: { type: ControlType.String, title: "Icon" },
    }

    render() {

        let RenderIcon = (props: { set: string }) => {
            let name = `${this.props.icon.toLowerCase()}`;
            let faName =
              "fa" +
              `${this.props.icon.charAt(0).toUpperCase()}` +
              `${this.props.icon.substr(1)}`;
              return (
                <FeatherIcon
                  icon={name}
                />
              );
            }

    return <WebfontLoader config={config} onStatus={callback}>
                <Draggable>
                    <StageContainer color={this.props.color}>
                        <ColorBox color={this.props.color}>
                        <div>
                            <RenderIcon set={this.props.set} />
                        </div>
                        </ColorBox>
                            <p>{this.props.text}</p>
                    </StageContainer>
                </Draggable>
            </WebfontLoader>;
    
    }
}



