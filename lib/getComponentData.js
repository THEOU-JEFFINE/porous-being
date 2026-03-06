import componentData from "./componentData-server.js";

export async function getComponentData() {
  // Return the component data - this is evaluated server-side only
  return componentData || [];
}
