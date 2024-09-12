'use client'

const TemplateCard = ({ template }) => {
    const renderComponents = () => {
        if (!template || !template.components) {
          return null;
     } else {
      return template.components.map((component, index) => {
        switch (component.type) {
          case 'HEADER':
            return (
              <div key={index}>
                {component.format === 'VIDEO' && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2791/2791441.png"
                    className="img-fluid"
                    alt="Header"
                  />
                )}
                {component.format === 'IMAGE' && (
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                    className="img-fluid"
                    alt="Header"
                  />
                )}
                {component.format === 'DOCUMENT' && (
                  <img
                    src="https://icones.pro/wp-content/uploads/2021/06/icone-fichier-document-noir.png"
                    className="img-fluid"
                    alt="Header"
                  />
                )}
                {component.format === 'TEXT' && (
                    <b> {component.text} </b>
                )}
              </div>
            );
          case 'BODY':
            return (
              <div className="max-height my-3" key={index}>
                <div>{component.text}</div>
              </div>
            );
          case 'FOOTER': // Corrected the case for 'FOOTER'
            return <div className="my-3" key={index}><small className="text-secondary">{component.text}</small></div>;
          case 'BUTTONS':
            return (
              <div key={index}>
                  <div className="container-fluid templateButton">
                    {component.buttons &&
                      component.buttons.map((button, buttonIndex) => (
                        <button className="btn btn-light border-top rounded-0 w-100" key={buttonIndex} type={button.type}>
                          {button.text}
                        </button>
                      ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      });
  }
    };
  
    return (
      <div className="template-card">
        <div className="components">
          {renderComponents()}
        </div>
      </div>
    );
  };
  
  export default TemplateCard;