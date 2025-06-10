export function code(strings: TemplateStringsArray) {
	return `\`\`\`\n${strings.join(' ').trim()}\`\`\``
}
