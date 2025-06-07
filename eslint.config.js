import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
	features: {
		stylistic: {
			// See https://github.com/eslint-stylistic/eslint-stylistic/blob/21704b67ff164adc31921110d9a2b5a18d96dfa3/packages/eslint-plugin/configs/customize.ts#L18-L30 for properties supported.
			// Other stylistic customizations must be done by appropriate rule appending - see comment below.
			// Defaults defined in eslint-plugin/configs/customize.ts:
			//
			// arrowParens = false,
			// blockSpacing = true,
			// braceStyle = 'stroustrup',
			// commaDangle = 'always-multiline',
			// flat = true,
			// indent = 2,
			// jsx = true,
			// pluginName = '@stylistic',
			// quoteProps = 'consistent-as-needed',
			// quotes = 'single',
			// semi = false,
			//
			// Customization:
			indent: "tab", // Note: "tab" implies setting indent to 4
			quotes: "double",
			semi: true,
			braceStyle: "1tbs", // will result in: '@stylistic/brace-style': ['error', braceStyle, { allowSingleLine: true }],
		},
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
			"vue/no-v-html": "error",
			"vue/max-attributes-per-line": [
				"error",
				{ singleline: 5, multiline: 1 },
			],
		},
	})
	// Override local typescript rules ()
	.override("nuxt/typescript/rules", {
		rules: {
			// "@typescript-eslint/no-explicit-any" taken from https://github.com/nuxt/nuxt.com/blob/main/eslint.config.mjs
			"@typescript-eslint/no-explicit-any": "off",
			// "@typescript-eslint/no-unused-vars" taken from https://github.com/nuxt/eslint/blob/main/packages/eslint-config/src/configs/typescript.ts
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "after-used", // default
					argsIgnorePattern: "^_", // default
					ignoreRestSiblings: true, // default
					vars: "all", // default
					varsIgnorePattern: "^_", // default
					// Allow unused vars for catch(e) {}
					caughtErrors: "none", // Added,  default: "all"
				},
			],
		},
	})
	.override("nuxt/javascript", {
		rules: {
			// Allow unused vars for catch(e) {}
			"no-unused-vars": ["error", { caughtErrors: "none" }],
		},
	});
