export const getIPFromRequest = (req: any) => {
	const conRemoteAddress = req.connection?.remoteAddress
	const sockRemoteAddress = req.socket?.remoteAddress
	const xRealIP = req.headers['x-real-ip']
	const xForwardedForIP = (() => {
		const xForwardedFor = req.headers['x-forwarded-for']
		if (xForwardedFor) {
			const ips = xForwardedFor.split(',').map(ip => ip.trim())
			return ips[0]
		}
	})()

	return xForwardedForIP || xRealIP || sockRemoteAddress || conRemoteAddress
}
