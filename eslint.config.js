import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
	"compilerOptions": {
		"noImplicitAny": true,
		"strictNullChecks": true
	},
})
	// Example for extended stylistic updates that cannot be done by features.stylistic above:
	// .append({
	// 	rules: {
	// 		// Workaround: "brace-style" does not work within features: stylistic: above!
	// 		"@stylistic/brace-style": [
	// 			"warn",
	// 			"1tbs",
	// 			{ allowSingleLine: false },
	// 		],
	// 	},
	// })
	.append({
		files: ["*.vue"],
		rules: {
			"vue/multi-word-component-names": "error",
			"no-debugger": "off",
		},
		// {
		// 	files: [
		// 		"app.vue",
		// 		"error.vue",
		// 		"pages/**/*.vue",
		// 		"layouts/**/*.vue",
		// 	],
		// 	rules: {
		// 		// disable the rule for these files
		// 		"vue/multi-word-component-names": "off",
		// 	},
		// }
	})
	// Override local Vue rules (taken from https://github.com/nuxt/nuxt.com/blob/main/eslint.config.mjs)
	.override("nuxt/vue/rules", {
		rules: {
			"vue/attributes-order": 'off',
			//"vue/no-v-html": "error",
			// "vue/max-attributes-per-line": [
			// 	"error",
			// 	{ singleline: 5, multiline: 1 },
			// ],
		},
	})
	// Override local typescript rules ()
	.override("nuxt/typescript/rules", {
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-this-alias": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/unified-signatures": "off",
		},
	})
	.override("nuxt/javascript", {
		rules: {
			// Allow unused vars for catch(e) {}
			"@typescript-eslint/no-unused-vars": "off",
		},
	});
