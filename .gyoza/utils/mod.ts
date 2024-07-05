const $exports = (content: any) => `export default ${Bun.inspect(content)}`;

export { $exports };