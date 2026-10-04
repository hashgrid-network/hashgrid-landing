/**
 * Robust clipboard copy helper with fallback for older browsers and WebViews
 */
export function copyReferralToClipboard(code: string): boolean {
  if (!code) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).catch(() => {
        fallbackCopyTextToClipboard(code);
      });
      return true;
    } else {
      return fallbackCopyTextToClipboard(code);
    }
  } catch (err) {
    return fallbackCopyTextToClipboard(code);
  }
}

function fallbackCopyTextToClipboard(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.warn('Fallback copy error:', err);
    return false;
  }
}

/**
 * Extract referral code from current URL or default fallback
 */
export function getActiveReferralCode(fallbackCode = 'HG-808080'): string {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('referral') || params.get('code');
    if (ref && ref.trim()) {
      return ref.trim().toUpperCase();
    }
  } catch (e) {
    console.warn('Error reading URL referral parameters', e);
  }
  return fallbackCode;
}
