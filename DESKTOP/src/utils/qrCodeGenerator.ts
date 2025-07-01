import QRCode from 'qrcode'

export function createQrCode(data: string): Promise<string> {
  return QRCode.toDataURL(JSON.stringify(data))
}
