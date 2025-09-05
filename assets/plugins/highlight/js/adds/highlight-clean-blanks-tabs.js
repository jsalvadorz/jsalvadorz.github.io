/*
* Highlight.js Remove Blank Lines & Fix Indentation Plugin
* Copyright (c) 2024, Junior Salvador
* MIT License
*/

class CleanBlanksAndTabsPlugin {
    constructor(options = {}) {
        self.hook = options.hook;
        self.callback = options.callback;
    }

    "after:highlightElement"({ el, text }) {
        // Get the content of the code
        if (el.tagName === "CODE" && el.parentNode.tagName === "PRE") {
            let codeLines = el.innerHTML.split("\n");
        
            // Find the minimum indentation (excluding empty lines)
            let minIndent = Infinity;
            for (let line of codeLines) {
                let trimmedLine = line.trimLeft();
                if (trimmedLine.length > 0) {
                    let indent = line.length - trimmedLine.length;
                    minIndent = Math.min(minIndent, indent);
                }
            }
            
            // Adjust the indentation of each line
            codeLines = codeLines.map(line => {
                if (line.trim().length > 0) {
                    return line.slice(minIndent);
                }
                return "";
            });
            
            // Remove leading and trailing blank spaces
            while (codeLines.length > 0 && codeLines[0].trim() === "") {
                codeLines.shift();
            }
            while (codeLines.length > 0 && codeLines[codeLines.length - 1].trim() === "") {
                codeLines.pop();
            }
            
            // Update the content of the element
            el.innerHTML = codeLines.join("\n");

            // Remove any trailing white space after the last visible character
            el.innerHTML = el.innerHTML.trim();
        }
    }
}