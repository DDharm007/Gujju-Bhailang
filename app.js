/**
 * Gujju-BhaiLang App - Simplified JavaScript
 * Handles mode toggling, code execution, and syntax highlighting
 */

class GujjuBhaiLangApp {
    constructor() {
        this.isAbusiveMode = false;
        this.interpreter = window.gujjuBhaiLangInterpreter;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateModeDisplay();
        this.updateCodeExamples();
        this.applySyntaxHighlighting();
    }

    setupEventListeners() {
        // Mode toggle buttons
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.setMode(mode === 'abusive');
            });
        });

        // Run button (only if it exists)
        const runBtn = document.getElementById('runBtn');
        if (runBtn) {
            runBtn.addEventListener('click', () => this.runCode());
        }

        // Clear button (only if it exists)
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCode());
        }

        // Code editor (only if it exists)
        const codeEditor = document.getElementById('codeEditor') || document.getElementById('demoCode');
        if (codeEditor) {
            codeEditor.addEventListener('input', () => {
                this.applySyntaxHighlighting();
            });
            
            codeEditor.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    e.preventDefault();
                    this.runCode();
                }
            });
        }
    }

    setMode(isAbusive) {
        this.isAbusiveMode = isAbusive;
        this.interpreter.setMode(isAbusive);
        this.updateModeDisplay();
        this.updateCodeExamples();
        this.applySyntaxHighlighting();
    }

    updateModeDisplay() {
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        toggleButtons.forEach(btn => {
            const mode = btn.dataset.mode;
            if ((mode === 'abusive' && this.isAbusiveMode) || 
                (mode === 'simple' && !this.isAbusiveMode)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateCodeExamples() {
        // Update code examples in documentation
        const codeExamples = document.querySelectorAll('.code-example');
        codeExamples.forEach(example => {
            if (example.classList.contains('simple-mode')) {
                if (this.isAbusiveMode) {
                    example.classList.add('hidden');
                } else {
                    example.classList.remove('hidden');
                }
            } else if (example.classList.contains('abusive-mode')) {
                if (this.isAbusiveMode) {
                    example.classList.remove('hidden');
                } else {
                    example.classList.add('hidden');
                }
            }
        });

        // Update code display in demo section
        const codeDisplays = document.querySelectorAll('.code-display');
        codeDisplays.forEach(display => {
            if (display.classList.contains('simple-mode')) {
                if (this.isAbusiveMode) {
                    display.classList.add('hidden');
                } else {
                    display.classList.remove('hidden');
                }
            } else if (display.classList.contains('abusive-mode')) {
                if (this.isAbusiveMode) {
                    display.classList.remove('hidden');
                } else {
                    display.classList.add('hidden');
                }
            }
        });
    }

    applySyntaxHighlighting() {
        const codeEditor = document.getElementById('codeEditor') || document.getElementById('demoCode');
        if (!codeEditor) return;

        const code = codeEditor.value;
        const highlightedCode = this.highlightCode(code);
        
        // Create a temporary div to hold the highlighted code
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = highlightedCode;
        
        // Apply the highlighting by setting the innerHTML
        // Note: This is a simplified approach for demo purposes
        // In a real implementation, you'd want to use a proper syntax highlighter
    }

    highlightCode(code) {
        // Simple syntax highlighting
        let highlighted = code;
        
        // Keywords
        const keywords = this.isAbusiveMode ? 
            ['sharu', 'samaapt', 'lakh chodya', 'loda ayia nakh', 'jo', 'to', 'nahi to', 'repeat', 'vaar', 'function'] :
            ['start', 'end', 'print', 'jo', 'to', 'nahi to', 'repeat', 'vaar', 'function'];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Strings
        highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
        highlighted = highlighted.replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>');
        
        // Numbers
        highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');
        
        // Comments
        highlighted = highlighted.replace(/#.*$/gm, '<span class="comment">$&</span>');
        
        // Operators
        highlighted = highlighted.replace(/[+\-*/=<>!&|]/g, '<span class="operator">$&</span>');
        
        // Variables (simple heuristic)
        highlighted = highlighted.replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, (match) => {
            if (!keywords.includes(match) && !match.match(/^\d/)) {
                return `<span class="variable">${match}</span>`;
            }
            return match;
        });
        
        return highlighted;
    }

    runCode() {
        const codeEditor = document.getElementById('codeEditor') || document.getElementById('demoCode');
        const output = document.getElementById('output');
        
        if (!codeEditor || !output) return;
        
        const code = codeEditor.value.trim();
        
        if (!code) {
            this.showError('Code likho pehla!');
            return;
        }
        
        // Clear previous output
        output.innerHTML = '';
        
        // Show loading state
        const runBtn = document.getElementById('runBtn');
        if (runBtn) {
            runBtn.classList.add('loading');
            runBtn.disabled = true;
        }
        
        // Execute code
        setTimeout(() => {
            try {
                const result = this.interpreter.execute(code);
                
                if (result.success) {
                    if (result.output.length > 0) {
                        result.output.forEach(line => {
                            this.showOutput(line);
                        });
                    } else {
                        this.showSuccess('Code successfully execute thayo!');
                    }
                } else {
                    this.showError(result.error);
                }
            } catch (error) {
                this.showError(`Unexpected error: ${error.message}`);
            } finally {
                // Remove loading state
                if (runBtn) {
                    runBtn.classList.remove('loading');
                    runBtn.disabled = false;
                }
            }
        }, 100);
    }

    showOutput(text) {
        const output = document.getElementById('output');
        if (!output) return;
        
        const outputLine = document.createElement('div');
        outputLine.className = 'output-line output-success';
        outputLine.textContent = text;
        
        output.appendChild(outputLine);
        output.scrollTop = output.scrollHeight;
    }

    showError(message) {
        const output = document.getElementById('output');
        if (!output) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'output-error';
        errorDiv.textContent = message;
        
        output.appendChild(errorDiv);
        output.scrollTop = output.scrollHeight;
    }

    showSuccess(message) {
        const output = document.getElementById('output');
        if (!output) return;
        
        const successDiv = document.createElement('div');
        successDiv.className = 'output-line output-success';
        successDiv.textContent = message;
        
        output.appendChild(successDiv);
        output.scrollTop = output.scrollHeight;
    }

    clearCode() {
        const codeEditor = document.getElementById('codeEditor') || document.getElementById('demoCode');
        if (codeEditor) {
            codeEditor.value = '';
            this.applySyntaxHighlighting();
        }
        
        const output = document.getElementById('output');
        if (output) {
            output.innerHTML = '';
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gujjuBhaiLangApp = new GujjuBhaiLangApp();
});