import "./style.css";
import { initWidget } from "./widget";

const widgetEl = document.querySelector("#widget-app");
widgetEl.innerHTML = `
  <div class="widget-inner">
    ini lho
  </div>
`;

initWidget(widgetEl);
