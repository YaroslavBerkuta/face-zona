const numberPattern = /\d+/g

const extractIds = (path: string) => path.match(numberPattern).map(it => Number(it))

const wrapId = (id: number) => `| ${id} |`

const generate = (parentId: number, parentPath: string) =>
	parentPath ? `${parentPath}${parentId} | ` : ` | ${parentId} | `

export const ThreeListPathUtil = {
	extractIds,
	wrapId,
	generate,
}
