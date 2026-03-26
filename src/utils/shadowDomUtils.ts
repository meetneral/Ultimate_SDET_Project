interface ShadowDOMUtil {
  getElementsInShadowDOM(element: Element): Promise<NodeList>;
  updateElementInShadowDOM(element: Element, newContent: string): Promise<void>;
}

class ShadowDOMUtil implements ShadowDOMUtil {
  async getElementsInShadowDOM(element: Element) {
    const shadowRoot = element.shadowRoot;
    return await shadowRoot.querySelectorAll('*');
  }

  async updateElementInShadowDOM(element: Element, newContent: string) {
    const shadowRoot = element.shadowRoot;
    const updatedElement = await shadowRoot.querySelector(element.tagName);
    updatedElement.innerHTML = newContent;
  }
}
