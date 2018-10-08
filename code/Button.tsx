import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import styled from "styled-components";
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

const ButtonContainer = styled.div`
    background: #E8A92E;
    height: 100%;
    color: #222834;
    padding: 20px;
    font-size: 14px;
    font-family: 'Montserrat', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
    letter-spacing: .5px;
    border-radius: 2px;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    border: 0px;
    text-transform: uppercase;

    &:hover {
        transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    &:active {
        transform: scale(1.1, 1.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        filter: brightness(120%);
    }

    p {
        position: relative;
        margin: 10px;
    }
`


// Define type of property
interface Props {
    buttonState: string;
    isIconLeft: boolean;
    iconLeft: string;
    isIconRight: boolean;
    iconRight: string;
    text: string;
}


export class Button extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
        buttonState: "primary",
        text: "New Stage",
        isIconLeft: false,
        iconLeft: "camera",
        isIconRight: false,
        iconRight: "camera",
        
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
        buttonState: {
            type: ControlType.Enum,
            options: ["primary", "secondary", "tertiary"],
            optionTitles: ["Primary", "Secondary", "Tertiary"],
            title: "Button Type"
          },
        text: { type: ControlType.String, title: "Text" },
        isIconLeft: { type: ControlType.Boolean, title: "Show Left Icon" },
        iconLeft: { type: ControlType.String, hidden: props => !props.isIconLeft, title: "Icon Left" },
        isIconRight: { type: ControlType.Boolean, title: "Show Right Icon" },
        iconRight: { type: ControlType.String,hidden: props => !props.isIconRight, title: "Icon Right" },
    }

    setType() {

      }
    

    render() {
        const { 
            isIconRight,
            isIconLeft 
        } = this.props        

        let RenderIconLeft = (props: { set: string }) => {
            let name = `${this.props.iconLeft.toLowerCase()}`;
            let faName =
              "fa" +
              `${this.props.iconLeft.charAt(0).toUpperCase()}` +
              `${this.props.iconLeft.substr(1)}`;
              return (
                <FeatherIcon
                  icon={name}
                />
              );
            }
        let RenderIconRight = (props: { set: string }) => {
            let name = `${this.props.iconRight.toLowerCase()}`;
            let faName =
                "fa" +
                `${this.props.iconRight.charAt(0).toUpperCase()}` +
                `${this.props.iconRight.substr(1)}`;
                return (
                <FeatherIcon
                    icon={name}
                />
                );
            }

    return <WebfontLoader config={config} onStatus={callback}>
                    <ButtonContainer>
                        {isIconLeft && <RenderIconLeft set={this.props.set} />}
                        <p>{this.props.text}</p>
                        {isIconRight && <RenderIconRight set={this.props.setSecond} />}
                    </ButtonContainer>
            </WebfontLoader>;
    
    }
}



