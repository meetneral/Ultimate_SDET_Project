interface IframeUtil {
  getContentsOfIframes(iframe: HTMLIFrameElement): Promise<NodeList>;
  updateContentInIframe(iframe: HTMLIFrameElement, newContent: string): Promise<void>;
}

class IframeUtil implements IframeUtil {
  async getContentsOfIframes(iframe: HTMLIFrameElement) {
    const iframeDocument = await iframe.contentDocument;
    return await iframeDocument.querySelectorAll('*');
  }

  async updateContentInIframe(iframe: HTMLIFrameElement, newContent: string) {
    const iframe*
