import { domBuilder, panelDisplay, panelInner } from "./helpers/domBuilder";

const trackedSteps: Array<string> = [];

const classIndexIfMultiple = (target: HTMLElement) => {
  const { classList } = target;
  const eleClass = `.${Array.from(classList).join(".")}`;
  const classMatches = document.querySelectorAll(eleClass);
  let thisClassIndex;
  if (classMatches.length > 1) {
    thisClassIndex = Array.from(classList).findIndex(indClass => indClass === target.className);
  }
  return [eleClass, thisClassIndex];
}

const getIdentity: ((target: HTMLElement | any) => {} | undefined | any) = (target: HTMLElement) => {
  if(target.id) {
    return `#${target.id}`
  } else if(target.classList.length) {
    const [ className, index ] = classIndexIfMultiple(target);
    return `${className}[${index||0}]`;
  } else if(target.parentElement) {
    return `${getIdentity(target.parentElement)} ${target.tagName.toLowerCase()}`;
  }
}

const trackClick = ( e: Event ) => {
  if(!panelDisplay) return;
  if(getIdentity(e.target)?.includes("jeeves__")) return;
  e.stopPropagation();
  const steps = document.createElement("ol");
  steps.classList.add("jeeves__steps");
  domBuilder();
  let action;
  let target;
  switch(e.type) {
    case "mousedown":
      action = "Click";
      target = getIdentity(e.target);
      break;
    case "contextmenu":
      action = "Right-click";
      target = getIdentity(e.target);
      break;
    case "keydown":
      const keyboardAction = e as KeyboardEvent;
      action = "Press";
      target = keyboardAction.key;
      break;
  }

  if(action==="Press" && trackedSteps.at(-1)?.split(" ")[0]==="Press") {
    const pressedStr = trackedSteps.at(-1)?.replace("Press ","").split(",");
    trackedSteps[trackedSteps.length-1] = `Press ${[...pressedStr!, target]}`;
  } else {
    trackedSteps.push(`${action} ${target}`);
  }
  panelInner!.innerHTML = "";
  // panel.append(header);
  trackedSteps.forEach(action => {
    const li = document.createElement("li");
    li.innerText = action;
    steps.append(li);
  })
  panelInner!.append(steps);

}

const onDOMLoad = () => {
  /* using mousedown instead of click to get element identifier before
   React (et&) can rerender and potentially change the target. */
  ["mousedown","contextmenu","keydown"].forEach(event =>
    document.addEventListener(
      event,
      trackClick
    )
  )
}

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded',onDOMLoad);
} else {
  onDOMLoad();
}