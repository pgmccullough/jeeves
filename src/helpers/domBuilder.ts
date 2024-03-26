type CSSProperties = {
  [key: string]: string;
};

export let panelDisplay: boolean = true;

const easyCSS = (element: HTMLElement, styleObject: CSSProperties) => {
  const { style } = element;
  for(const [key, value] of Object.entries(styleObject)) {
    style[key as any] = value;
  }
}

export let header: HTMLElement | null;
export let panelClose: HTMLElement | null;
export let panel: HTMLElement | null;
export let panelInner: HTMLElement | null;

export const domBuilder = () => {
  if(document.querySelector('.jeeves__panel')) {
    panel = document.querySelector(".jeeves__panel");
    header = document.querySelector(".jeeves__header");
    return;
  }
  panel = document.createElement("div");
    panel.classList.add("jeeves__panel");
    easyCSS(panel, { 
      position: "fixed",
      top: "0.5rem",
      right: "8px",
      height: "calc(100vh - 1rem)",
      width: "20rem",
      background: "#fff",
      zIndex: "99999999999",
      borderRadius: "6px",
      boxShadow: "0 0 6px 0 #000",
      opacity: "0.9",
      backdropFilter: "blur(4px)",
      overflowWrap: "break-word",
      boxSizing: "border-box",
      font: "1.1rem helvetica, sans",
      lineHeight: "2rem",
      overflow: "hidden"
    })

    header = document.createElement("div");
    header.innerHTML = `Jeeves`;
    header.classList.add("jeeves__header");
    easyCSS(header, { 
      position: "relative",
      cursor: "move",
      background: "#eee",
      borderBottom: "2px solid #666",
      width: "100%",
      textAlign: "center"
    });
    panel.append(header);

    panelInner = document.createElement("div");
    panelInner.classList.add("jeeves__panel-inner");
    easyCSS(panelInner, { 
      width: "100%",
      height: "100%",
      overflowY: "auto",
      boxSizing: "border-box",
      paddingBottom: "3rem",
      paddingRight: "2rem"
    });
    panel.append(panelInner);

    panelClose = document.createElement("div");
    panelClose.classList.add("jeeves__close");
    easyCSS(panelClose, { 
      position: "absolute",
      right: "0.25rem",
      top: "0.25rem",
      display: "inline-block",
      cursor: "pointer",
      background: "#eee",
      border: "2px #666 solid",
      borderTopColor: "#888",
      bordeLeftColor: "#888",
      width: "1.5rem",
      height: "1.5rem",
      borderRadius: "3px",
      textAlign: "center"
    });
    header.append(panelClose);
    document.body.append(panel);

    let draggingHeader: boolean = false;
    let panelPos: number = 8;

    const movePanel = (e: MouseEvent, action: string) => {
      switch(action) {
        case "down":
          draggingHeader = true;
          break;
        case "up":
          draggingHeader = false;
          break;
        case "move":
          if(!draggingHeader) return;
          panelPos += (e.movementX * -1);
          panel!.style.right = panelPos+"px";
          break;
      }
    }

    header.addEventListener('mousedown', (e) => movePanel(e, 'down'));
    header.addEventListener('mouseup', (e) => movePanel(e, 'up'));
    header.addEventListener('mousemove', (e) => movePanel(e, 'move'));
    panelClose.addEventListener("click", () => { panel?.remove(); panelDisplay = false });
}