/**
 * Gujju-BhaiLang Interpreter
 * A toy programming language inspired by Gujarati culture
 * Supports two modes: Simple (Sado Code) and Abusive (Maja Vado Code)
 */

class GujjuBhaiLangInterpreter {
    constructor() {
        this.isAbusiveMode = false;
        this.variables = {};
        this.functions = {};
        this.output = [];
        this.currentLine = 0;
        
        // Keywords mapping for both modes
        this.keywords = {
            simple: {
                start: 'start',
                end: 'end',
                print: 'print',
                variable: '=', // For variable assignment
                if: 'jo',
                then: 'to',
                else: 'nahi to',
                repeat: 'repeat',
                times: 'vaar',
                list: 'list',
                function: 'function',
                comment: '#'
            },
            abusive: {
                start: 'sharu',
                end: 'samaapt',
                print: 'lakh chodya',
                variable: 'loda ayia nakh', // For variable assignment
                if: 'jo',
                then: 'to',
                else: 'nahi to',
                repeat: 'repeat',
                times: 'vaar',
                list: 'loda ayia nakh list',
                function: 'function',
                comment: '#'
            }
        };
        
        // Sample code examples
        this.examples = {
            hello: {
                simple: `start:
  print: "Kem cho bhai!"
end:`,
                abusive: `sharu:
  lakh chodya: "Kem cho loda!"
samaapt:`
            },
            conditional: {
                simple: `start:
  umar = 25
  jo (umar > 18) to {
    print: "Tame adult cho"
  } nahi to {
    print: "Tame balak cho"
  }
end:`,
                abusive: `sharu:
  loda ayia nakh umar = 25
  jo (umar > 18) to {
    lakh chodya: "Bhos, tame mota cho"
  } nahi to {
    lakh chodya: "Chodya balak"
  }
samaapt:`
            },
            loop: {
                simple: `start:
  repeat 5 vaar {
    print: "Maja ma che"
  }
end:`,
                abusive: `sharu:
  repeat 5 vaar {
    lakh chodya: "Maja avi gai chodya"
  }
samaapt:`
            },
            function: {
                simple: `start:
  function bolavo(naam) {
    print: "Kem cho " + naam
  }
  bolavo("Bhai")
end:`,
                abusive: `sharu:
  function loda_bolavo(naam) {
    lakh chodya: "Kem cho loda " + naam
  }
  loda_bolavo("Bhai")
samaapt:`
            },
            array: {
                simple: `start:
  list mitro = ["Ram", "Shyam", "Mohan"]
  print: mitro[0]
  print: "Total mitro: " + mitro.length
end:`,
                abusive: `sharu:
  loda ayia nakh list lodo = ["Ram", "Shyam", "Mohan"]
  lakh chodya: lodo[0]
  lakh chodya: "Total lodo: " + lodo.length
samaapt:`
            }
        };
    }

    /**
     * Set the mode (simple or abusive)
     */
    setMode(isAbusive) {
        this.isAbusiveMode = isAbusive;
    }

    /**
     * Get current keywords based on mode
     */
    getKeywords() {
        return this.isAbusiveMode ? this.keywords.abusive : this.keywords.simple;
    }

    /**
     * Get sample code for current mode
     */
    getExample(exampleName) {
        const example = this.examples[exampleName];
        if (!example) return '';
        return this.isAbusiveMode ? example.abusive : example.simple;
    }

    /**
     * Lexer - Tokenize the input code
     */
    tokenize(code) {
        const tokens = [];
        const lines = code.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || line.startsWith('#')) continue; // Skip empty lines and comments
            
            const lineTokens = this.tokenizeLine(line, i + 1);
            tokens.push(...lineTokens);
        }
        
        return tokens;
    }

    /**
     * Tokenize a single line
     */
    tokenizeLine(line, lineNumber) {
        const tokens = [];
        const keywords = this.getKeywords();
        
        // Remove comments
        const commentIndex = line.indexOf('#');
        if (commentIndex !== -1) {
            line = line.substring(0, commentIndex).trim();
        }
        
        if (!line) return tokens;
        
        // Split by spaces but preserve strings
        const parts = this.splitPreservingStrings(line);
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (!part) continue;
            
            // Check for keywords
            if (part === keywords.start) {
                tokens.push({ type: 'START', value: part, line: lineNumber });
            } else if (part === keywords.end) {
                tokens.push({ type: 'END', value: part, line: lineNumber });
            } else if (part === keywords.print) {
                tokens.push({ type: 'PRINT', value: part, line: lineNumber });
            } else if (part === keywords.if) {
                tokens.push({ type: 'IF', value: part, line: lineNumber });
            } else if (part === keywords.then) {
                tokens.push({ type: 'THEN', value: part, line: lineNumber });
            } else if (part === keywords.else) {
                tokens.push({ type: 'ELSE', value: part, line: lineNumber });
            } else if (part === keywords.repeat) {
                tokens.push({ type: 'REPEAT', value: part, line: lineNumber });
            } else if (part === keywords.times) {
                tokens.push({ type: 'TIMES', value: part, line: lineNumber });
            } else if (part === keywords.function) {
                tokens.push({ type: 'FUNCTION', value: part, line: lineNumber });
            } else if (part === '=') {
                tokens.push({ type: 'ASSIGN', value: part, line: lineNumber });
            } else if (part === '{') {
                tokens.push({ type: 'LBRACE', value: part, line: lineNumber });
            } else if (part === '}') {
                tokens.push({ type: 'RBRACE', value: part, line: lineNumber });
            } else if (part === '(') {
                tokens.push({ type: 'LPAREN', value: part, line: lineNumber });
            } else if (part === ')') {
                tokens.push({ type: 'RPAREN', value: part, line: lineNumber });
            } else if (part === '[') {
                tokens.push({ type: 'LBRACKET', value: part, line: lineNumber });
            } else if (part === ']') {
                tokens.push({ type: 'RBRACKET', value: part, line: lineNumber });
            } else if (part === ',') {
                tokens.push({ type: 'COMMA', value: part, line: lineNumber });
            } else if (part === '+') {
                tokens.push({ type: 'PLUS', value: part, line: lineNumber });
            } else if (part === '-') {
                tokens.push({ type: 'MINUS', value: part, line: lineNumber });
            } else if (part === '*') {
                tokens.push({ type: 'MULTIPLY', value: part, line: lineNumber });
            } else if (part === '/') {
                tokens.push({ type: 'DIVIDE', value: part, line: lineNumber });
            } else if (part === '>') {
                tokens.push({ type: 'GT', value: part, line: lineNumber });
            } else if (part === '<') {
                tokens.push({ type: 'LT', value: part, line: lineNumber });
            } else if (part === '==') {
                tokens.push({ type: 'EQ', value: part, line: lineNumber });
            } else if (part === '!=') {
                tokens.push({ type: 'NEQ', value: part, line: lineNumber });
            } else if (part === 'and') {
                tokens.push({ type: 'AND', value: part, line: lineNumber });
            } else if (part === 'or') {
                tokens.push({ type: 'OR', value: part, line: lineNumber });
            } else if (part === 'not') {
                tokens.push({ type: 'NOT', value: part, line: lineNumber });
            } else if (part === 'true') {
                tokens.push({ type: 'BOOLEAN', value: true, line: lineNumber });
            } else if (part === 'false') {
                tokens.push({ type: 'BOOLEAN', value: false, line: lineNumber });
            } else if (this.isString(part)) {
                tokens.push({ type: 'STRING', value: this.parseString(part), line: lineNumber });
            } else if (this.isNumber(part)) {
                tokens.push({ type: 'NUMBER', value: parseFloat(part), line: lineNumber });
            } else if (this.isArray(part)) {
                tokens.push({ type: 'ARRAY', value: this.parseArray(part), line: lineNumber });
            } else if (this.isVariableAssignment(parts, i)) {
                // Handle variable assignment with special keywords
                if (this.isAbusiveMode && parts[i] === 'loda' && parts[i + 1] === 'ayia' && parts[i + 2] === 'nakh') {
                    tokens.push({ type: 'VARIABLE_ASSIGN', value: 'loda ayia nakh', line: lineNumber });
                    i += 2; // Skip the next two tokens
                } else if (!this.isAbusiveMode) {
                    // Simple mode variable assignment
                    tokens.push({ type: 'VARIABLE_ASSIGN', value: '=', line: lineNumber });
                }
            } else if (this.isListKeyword(parts, i)) {
                // Handle list keyword
                if (this.isAbusiveMode && parts[i] === 'loda' && parts[i + 1] === 'ayia' && parts[i + 2] === 'nakh' && parts[i + 3] === 'list') {
                    tokens.push({ type: 'LIST', value: 'loda ayia nakh list', line: lineNumber });
                    i += 3; // Skip the next three tokens
                } else if (!this.isAbusiveMode && parts[i] === 'list') {
                    tokens.push({ type: 'LIST', value: 'list', line: lineNumber });
                }
            } else {
                // Identifier (variable name, function name, etc.)
                tokens.push({ type: 'IDENTIFIER', value: part, line: lineNumber });
            }
        }
        
        return tokens;
    }

    /**
     * Split string while preserving quoted strings
     */
    splitPreservingStrings(str) {
        const parts = [];
        let current = '';
        let inString = false;
        let stringChar = '';
        
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            
            if (!inString && (char === '"' || char === "'")) {
                inString = true;
                stringChar = char;
                current += char;
            } else if (inString && char === stringChar) {
                inString = false;
                current += char;
            } else if (!inString && char === ' ') {
                if (current.trim()) {
                    parts.push(current.trim());
                    current = '';
                }
            } else {
                current += char;
            }
        }
        
        if (current.trim()) {
            parts.push(current.trim());
        }
        
        return parts;
    }

    /**
     * Check if token is a string
     */
    isString(token) {
        return (token.startsWith('"') && token.endsWith('"')) || 
               (token.startsWith("'") && token.endsWith("'"));
    }

    /**
     * Parse string value
     */
    parseString(token) {
        return token.slice(1, -1);
    }

    /**
     * Check if token is a number
     */
    isNumber(token) {
        return !isNaN(parseFloat(token)) && isFinite(token);
    }

    /**
     * Check if token is an array
     */
    isArray(token) {
        return token.startsWith('[') && token.endsWith(']');
    }

    /**
     * Parse array value
     */
    parseArray(token) {
        const content = token.slice(1, -1);
        if (!content.trim()) return [];
        
        const items = content.split(',').map(item => {
            item = item.trim();
            if (this.isString(item)) {
                return this.parseString(item);
            } else if (this.isNumber(item)) {
                return parseFloat(item);
            } else if (item === 'true') {
                return true;
            } else if (item === 'false') {
                return false;
            }
            return item;
        });
        
        return items;
    }

    /**
     * Check if current position is variable assignment
     */
    isVariableAssignment(parts, index) {
        if (this.isAbusiveMode) {
            return parts[index] === 'loda' && 
                   parts[index + 1] === 'ayia' && 
                   parts[index + 2] === 'nakh' &&
                   parts[index + 3] === '=' &&
                   this.isValidIdentifier(parts[index + 4]);
        } else {
            return this.isValidIdentifier(parts[index]) && 
                   parts[index + 1] === '=';
        }
    }

    /**
     * Check if current position is list keyword
     */
    isListKeyword(parts, index) {
        if (this.isAbusiveMode) {
            return parts[index] === 'loda' && 
                   parts[index + 1] === 'ayia' && 
                   parts[index + 2] === 'nakh' &&
                   parts[index + 3] === 'list';
        } else {
            return parts[index] === 'list';
        }
    }

    /**
     * Check if token is valid identifier
     */
    isValidIdentifier(token) {
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token);
    }

    /**
     * Parser - Build Abstract Syntax Tree
     */
    parse(tokens) {
        this.tokens = tokens;
        this.current = 0;
        
        try {
            const ast = this.parseProgram();
            return ast;
        } catch (error) {
            throw new Error(`Parse error: ${error.message}`);
        }
    }

    /**
     * Parse program structure
     */
    parseProgram() {
        const program = {
            type: 'Program',
            body: []
        };
        
        // Expect start keyword
        if (this.peek().type !== 'START') {
            throw new Error('Program must start with start: or sharu:');
        }
        this.advance();
        
        // Parse statements until end
        while (this.current < this.tokens.length && this.peek().type !== 'END') {
            const statement = this.parseStatement();
            if (statement) {
                program.body.push(statement);
            }
        }
        
        // Expect end keyword
        if (this.peek().type !== 'END') {
            throw new Error('Program must end with end: or samaapt:');
        }
        this.advance();
        
        return program;
    }

    /**
     * Parse individual statement
     */
    parseStatement() {
        const token = this.peek();
        
        switch (token.type) {
            case 'PRINT':
                return this.parsePrintStatement();
            case 'VARIABLE_ASSIGN':
            case 'LIST':
                return this.parseVariableStatement();
            case 'FUNCTION':
                return this.parseFunctionStatement();
            case 'IF':
                return this.parseIfStatement();
            case 'REPEAT':
                return this.parseRepeatStatement();
            case 'IDENTIFIER':
                // Could be function call or variable assignment
                if (this.peek(1).type === 'LPAREN') {
                    return this.parseFunctionCall();
                } else {
                    return this.parseVariableStatement();
                }
            default:
                this.advance(); // Skip unknown tokens
                return null;
        }
    }

    /**
     * Parse print statement
     */
    parsePrintStatement() {
        this.advance(); // consume PRINT
        
        if (this.peek().type !== 'COLON') {
            // Handle print: syntax
            if (this.peek().value === ':') {
                this.advance(); // consume colon
            }
        }
        
        const expression = this.parseExpression();
        
        return {
            type: 'PrintStatement',
            expression: expression
        };
    }

    /**
     * Parse variable assignment
     */
    parseVariableStatement() {
        let isList = false;
        
        if (this.peek().type === 'LIST') {
            isList = true;
            this.advance(); // consume LIST
        } else if (this.peek().type === 'VARIABLE_ASSIGN') {
            this.advance(); // consume VARIABLE_ASSIGN
        }
        
        const name = this.advance(); // variable name
        
        if (name.type !== 'IDENTIFIER') {
            throw new Error('Expected variable name');
        }
        
        if (this.peek().type !== 'ASSIGN') {
            throw new Error('Expected = after variable name');
        }
        this.advance(); // consume =
        
        const value = this.parseExpression();
        
        return {
            type: 'VariableStatement',
            name: name.value,
            value: value,
            isList: isList
        };
    }

    /**
     * Parse function definition
     */
    parseFunctionStatement() {
        this.advance(); // consume FUNCTION
        
        const name = this.advance();
        if (name.type !== 'IDENTIFIER') {
            throw new Error('Expected function name');
        }
        
        if (this.peek().type !== 'LPAREN') {
            throw new Error('Expected ( after function name');
        }
        this.advance(); // consume (
        
        const params = [];
        if (this.peek().type !== 'RPAREN') {
            while (true) {
                const param = this.advance();
                if (param.type !== 'IDENTIFIER') {
                    throw new Error('Expected parameter name');
                }
                params.push(param.value);
                
                if (this.peek().type === 'RPAREN') break;
                if (this.peek().type !== 'COMMA') {
                    throw new Error('Expected , or )');
                }
                this.advance(); // consume ,
            }
        }
        this.advance(); // consume )
        
        if (this.peek().type !== 'LBRACE') {
            throw new Error('Expected { after function parameters');
        }
        this.advance(); // consume {
        
        const body = [];
        while (this.peek().type !== 'RBRACE') {
            const statement = this.parseStatement();
            if (statement) {
                body.push(statement);
            }
        }
        this.advance(); // consume }
        
        return {
            type: 'FunctionStatement',
            name: name.value,
            params: params,
            body: body
        };
    }

    /**
     * Parse if statement
     */
    parseIfStatement() {
        this.advance(); // consume IF
        
        if (this.peek().type !== 'LPAREN') {
            throw new Error('Expected ( after if');
        }
        this.advance(); // consume (
        
        const condition = this.parseExpression();
        
        if (this.peek().type !== 'RPAREN') {
            throw new Error('Expected ) after condition');
        }
        this.advance(); // consume )
        
        if (this.peek().type !== 'THEN') {
            throw new Error('Expected then after condition');
        }
        this.advance(); // consume THEN
        
        if (this.peek().type !== 'LBRACE') {
            throw new Error('Expected { after then');
        }
        this.advance(); // consume {
        
        const thenBody = [];
        while (this.peek().type !== 'RBRACE') {
            const statement = this.parseStatement();
            if (statement) {
                thenBody.push(statement);
            }
        }
        this.advance(); // consume }
        
        let elseBody = null;
        if (this.peek().type === 'ELSE') {
            this.advance(); // consume ELSE
            
            if (this.peek().type !== 'LBRACE') {
                throw new Error('Expected { after else');
            }
            this.advance(); // consume {
            
            elseBody = [];
            while (this.peek().type !== 'RBRACE') {
                const statement = this.parseStatement();
                if (statement) {
                    elseBody.push(statement);
                }
            }
            this.advance(); // consume }
        }
        
        return {
            type: 'IfStatement',
            condition: condition,
            thenBody: thenBody,
            elseBody: elseBody
        };
    }

    /**
     * Parse repeat statement
     */
    parseRepeatStatement() {
        this.advance(); // consume REPEAT
        
        const count = this.parseExpression();
        
        if (this.peek().type !== 'TIMES') {
            throw new Error('Expected vaar after repeat count');
        }
        this.advance(); // consume TIMES
        
        if (this.peek().type !== 'LBRACE') {
            throw new Error('Expected { after repeat');
        }
        this.advance(); // consume {
        
        const body = [];
        while (this.peek().type !== 'RBRACE') {
            const statement = this.parseStatement();
            if (statement) {
                body.push(statement);
            }
        }
        this.advance(); // consume }
        
        return {
            type: 'RepeatStatement',
            count: count,
            body: body
        };
    }

    /**
     * Parse function call
     */
    parseFunctionCall() {
        const name = this.advance();
        if (name.type !== 'IDENTIFIER') {
            throw new Error('Expected function name');
        }
        
        if (this.peek().type !== 'LPAREN') {
            throw new Error('Expected ( after function name');
        }
        this.advance(); // consume (
        
        const args = [];
        if (this.peek().type !== 'RPAREN') {
            while (true) {
                const arg = this.parseExpression();
                args.push(arg);
                
                if (this.peek().type === 'RPAREN') break;
                if (this.peek().type !== 'COMMA') {
                    throw new Error('Expected , or )');
                }
                this.advance(); // consume ,
            }
        }
        this.advance(); // consume )
        
        return {
            type: 'FunctionCall',
            name: name.value,
            args: args
        };
    }

    /**
     * Parse expression
     */
    parseExpression() {
        return this.parseLogicalOr();
    }

    /**
     * Parse logical OR
     */
    parseLogicalOr() {
        let left = this.parseLogicalAnd();
        
        while (this.peek().type === 'OR') {
            this.advance();
            const right = this.parseLogicalAnd();
            left = {
                type: 'BinaryExpression',
                operator: 'or',
                left: left,
                right: right
            };
        }
        
        return left;
    }

    /**
     * Parse logical AND
     */
    parseLogicalAnd() {
        let left = this.parseEquality();
        
        while (this.peek().type === 'AND') {
            this.advance();
            const right = this.parseEquality();
            left = {
                type: 'BinaryExpression',
                operator: 'and',
                left: left,
                right: right
            };
        }
        
        return left;
    }

    /**
     * Parse equality
     */
    parseEquality() {
        let left = this.parseComparison();
        
        while (this.peek().type === 'EQ' || this.peek().type === 'NEQ') {
            const operator = this.advance();
            const right = this.parseComparison();
            left = {
                type: 'BinaryExpression',
                operator: operator.value,
                left: left,
                right: right
            };
        }
        
        return left;
    }

    /**
     * Parse comparison
     */
    parseComparison() {
        let left = this.parseAddition();
        
        while (this.peek().type === 'GT' || this.peek().type === 'LT') {
            const operator = this.advance();
            const right = this.parseAddition();
            left = {
                type: 'BinaryExpression',
                operator: operator.value,
                left: left,
                right: right
            };
        }
        
        return left;
    }

    /**
     * Parse addition
     */
    parseAddition() {
        let left = this.parseMultiplication();
        
        while (this.peek().type === 'PLUS' || this.peek().type === 'MINUS') {
            const operator = this.advance();
            const right = this.parseMultiplication();
            left = {
                type: 'BinaryExpression',
                operator: operator.value,
                left: left,
                right: right
            };
        }
        
        return left;
    }

    /**
     * Parse multiplication
     */
    parseMultiplication() {
        let left = this.parsePrimary();
        
        while (this.peek().type === 'MULTIPLY' || this.peek().type === 'DIVIDE') {
            const operator = this.advance();
            const right = this.parsePrimary();
            left = {
                type: 'BinaryExpression',
                operator: operator.value,
                left: left,
                right: right
            };
        }
        
        return left;
    }

    /**
     * Parse primary expression
     */
    parsePrimary() {
        const token = this.peek();
        
        switch (token.type) {
            case 'NUMBER':
                this.advance();
                return {
                    type: 'NumberLiteral',
                    value: token.value
                };
            case 'STRING':
                this.advance();
                return {
                    type: 'StringLiteral',
                    value: token.value
                };
            case 'BOOLEAN':
                this.advance();
                return {
                    type: 'BooleanLiteral',
                    value: token.value
                };
            case 'ARRAY':
                this.advance();
                return {
                    type: 'ArrayLiteral',
                    value: token.value
                };
            case 'IDENTIFIER':
                this.advance();
                // Check if it's array access
                if (this.peek().type === 'LBRACKET') {
                    this.advance(); // consume [
                    const index = this.parseExpression();
                    if (this.peek().type !== 'RBRACKET') {
                        throw new Error('Expected ] after array index');
                    }
                    this.advance(); // consume ]
                    return {
                        type: 'ArrayAccess',
                        name: token.value,
                        index: index
                    };
                }
                return {
                    type: 'Identifier',
                    name: token.value
                };
            case 'LPAREN':
                this.advance(); // consume (
                const expression = this.parseExpression();
                if (this.peek().type !== 'RPAREN') {
                    throw new Error('Expected ) after expression');
                }
                this.advance(); // consume )
                return expression;
            default:
                throw new Error(`Unexpected token: ${token.type}`);
        }
    }

    /**
     * Get current token
     */
    peek(offset = 0) {
        return this.tokens[this.current + offset] || { type: 'EOF' };
    }

    /**
     * Advance to next token
     */
    advance() {
        return this.tokens[this.current++];
    }

    /**
     * Evaluator - Execute the AST
     */
    evaluate(ast) {
        this.output = [];
        this.variables = {};
        this.functions = {};
        
        try {
            this.evaluateNode(ast);
            return this.output;
        } catch (error) {
            throw new Error(`Runtime error: ${error.message}`);
        }
    }

    /**
     * Evaluate AST node
     */
    evaluateNode(node) {
        switch (node.type) {
            case 'Program':
                for (const statement of node.body) {
                    this.evaluateNode(statement);
                }
                break;
            case 'PrintStatement':
                const value = this.evaluateExpression(node.expression);
                this.output.push(String(value));
                break;
            case 'VariableStatement':
                const varValue = this.evaluateExpression(node.value);
                this.variables[node.name] = varValue;
                break;
            case 'FunctionStatement':
                this.functions[node.name] = {
                    params: node.params,
                    body: node.body
                };
                break;
            case 'IfStatement':
                const condition = this.evaluateExpression(node.condition);
                if (this.isTruthy(condition)) {
                    for (const statement of node.thenBody) {
                        this.evaluateNode(statement);
                    }
                } else if (node.elseBody) {
                    for (const statement of node.elseBody) {
                        this.evaluateNode(statement);
                    }
                }
                break;
            case 'RepeatStatement':
                const count = this.evaluateExpression(node.count);
                for (let i = 0; i < count; i++) {
                    for (const statement of node.body) {
                        this.evaluateNode(statement);
                    }
                }
                break;
            case 'FunctionCall':
                const func = this.functions[node.name];
                if (!func) {
                    throw new Error(`Function ${node.name} is not defined`);
                }
                
                // Create new scope for function
                const oldVariables = { ...this.variables };
                
                // Set parameters
                for (let i = 0; i < node.args.length; i++) {
                    const paramName = func.params[i];
                    const argValue = this.evaluateExpression(node.args[i]);
                    this.variables[paramName] = argValue;
                }
                
                // Execute function body
                for (const statement of func.body) {
                    this.evaluateNode(statement);
                }
                
                // Restore old variables
                this.variables = oldVariables;
                break;
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    /**
     * Evaluate expression
     */
    evaluateExpression(expr) {
        switch (expr.type) {
            case 'NumberLiteral':
                return expr.value;
            case 'StringLiteral':
                return expr.value;
            case 'BooleanLiteral':
                return expr.value;
            case 'ArrayLiteral':
                return expr.value;
            case 'Identifier':
                if (!(expr.name in this.variables)) {
                    throw new Error(`Variable ${expr.name} is not defined`);
                }
                return this.variables[expr.name];
            case 'ArrayAccess':
                const array = this.variables[expr.name];
                if (!Array.isArray(array)) {
                    throw new Error(`${expr.name} is not an array`);
                }
                const index = this.evaluateExpression(expr.index);
                if (index < 0 || index >= array.length) {
                    throw new Error(`Array index ${index} out of bounds`);
                }
                return array[index];
            case 'BinaryExpression':
                const left = this.evaluateExpression(expr.left);
                const right = this.evaluateExpression(expr.right);
                
                switch (expr.operator) {
                    case '+':
                        return left + right;
                    case '-':
                        return left - right;
                    case '*':
                        return left * right;
                    case '/':
                        if (right === 0) {
                            throw new Error('Division by zero');
                        }
                        return left / right;
                    case '>':
                        return left > right;
                    case '<':
                        return left < right;
                    case '==':
                        return left == right;
                    case '!=':
                        return left != right;
                    case 'and':
                        return this.isTruthy(left) && this.isTruthy(right);
                    case 'or':
                        return this.isTruthy(left) || this.isTruthy(right);
                    default:
                        throw new Error(`Unknown operator: ${expr.operator}`);
                }
            default:
                throw new Error(`Unknown expression type: ${expr.type}`);
        }
    }

    /**
     * Check if value is truthy
     */
    isTruthy(value) {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value !== 0;
        if (typeof value === 'string') return value.length > 0;
        if (Array.isArray(value)) return value.length > 0;
        return Boolean(value);
    }

    /**
     * Get error message based on mode and error type
     */
    getErrorMessage(error, line = null) {
        const isAbusive = this.isAbusiveMode;
        
        // Syntax Errors
        if (error.includes('Syntax') || error.includes('Parse error')) {
            if (error.includes('start:') || error.includes('sharu:')) {
                return isAbusive ? 
                    "Error: 'sharu:' thi sharu kar na! Kyan thi chalu karyo?" :
                    "Error: 'start:' thi sharu karo - program must begin with start:";
            }
            if (error.includes('end:') || error.includes('samaapt:')) {
                return isAbusive ?
                    "Error: 'samaapt:' thi khatam kar chodya!" :
                    "Error: 'end:' thi khatam karo - program must end with end:";
            }
            if (error.includes('{')) {
                return isAbusive ?
                    "Error: Ae loda! Syntax gadbad che! '{' kyan che?" :
                    "Error: Syntax gadbad che! Missing '{' after 'to'";
            }
            if (error.includes('}')) {
                return isAbusive ?
                    "Error: Bracket to band kar be! '}' bhuli gayo ke?" :
                    "Error: Bracket band karo - expected '}'";
            }
            if (error.includes('quote') || error.includes('string')) {
                return isAbusive ?
                    "Error: String ni quote chuti gai loda - quote lagav" :
                    "Error: String ni quote chuti gai - missing closing quote";
            }
            if (error.includes(':')) {
                return isAbusive ?
                    "Error: Bhos! ':' to lakh chodya" :
                    "Error: Semicolon ni jarur nathi, pan ':' bhuli gaya";
            }
            return isAbusive ?
                "Error: Ae loda! Syntax gadbad che!" :
                "Error: Syntax gadbad che!";
        }
        
        // Variable Errors
        if (error.includes('Variable') || error.includes('not defined')) {
            if (error.includes('not defined')) {
                return isAbusive ?
                    "Error: Loda 'naam' declare j nathi karyu! Pehla declare kar" :
                    "Error: Variable 'naam' declare nathi - variable not declared";
            }
            if (error.includes('assign')) {
                return isAbusive ?
                    "Error: Value to assign kar chodya! Khali chhodu ke?" :
                    "Error: Variable ni value assign karo pehla";
            }
            if (error.includes('Invalid') && error.includes('name')) {
                return isAbusive ?
                    "Error: Invalid naam che be - numbers thi sharu thay?" :
                    "Error: Invalid variable name - numbers thi sharu nahi thai shake";
            }
            if (error.includes('loda ayia nakh')) {
                return isAbusive ?
                    "Error: 'loda ayia nakh' lakh chodya bhuli gayo?" :
                    "Error: Variable declaration syntax ghalat che";
            }
        }
        
        // Conditional Errors
        if (error.includes('jo') || error.includes('condition')) {
            if (error.includes('condition')) {
                return isAbusive ?
                    "Error: 'jo' pachhi condition to lakh chodya!" :
                    "Error: 'jo' ni condition ni jarur che - condition required after 'jo'";
            }
            if (error.includes('to')) {
                return isAbusive ?
                    "Error: 'to' bhuli gayo ke loda?" :
                    "Error: 'to' bhuli gaya - expected 'to' after condition";
            }
            if (error.includes('parentheses')) {
                return isAbusive ?
                    "Error: Bhos! Parentheses () kyan che?" :
                    "Error: Condition ma parentheses () use karo";
            }
        }
        
        // Loop Errors
        if (error.includes('repeat') || error.includes('loop')) {
            if (error.includes('number')) {
                return isAbusive ?
                    "Error: 'repeat' pachhi number to bol chodya!" :
                    "Error: 'repeat' pachhi number aapvo - specify number after repeat";
            }
            if (error.includes('vaar')) {
                return isAbusive ?
                    "Error: 'vaar' lakh chodya bhuli gayo?" :
                    "Error: 'vaar' keyword bhuli gaya";
            }
            if (error.includes('negative') || error.includes('infinite')) {
                return isAbusive ?
                    "Error: Infinite loop ma fas gayo loda! Band kar!" :
                    "Error: Infinite loop detect thayo - loop kadi nathi band thatu";
            }
        }
        
        // Function Errors
        if (error.includes('Function') || error.includes('function')) {
            if (error.includes('not defined') || error.includes('not declared')) {
                return isAbusive ?
                    "Error: Function 'loda_bolavo' declare j nathi! Pehla bana" :
                    "Error: Function 'bolavo' declare nathi - function not declared";
            }
            if (error.includes('parameter') || error.includes('argument')) {
                return isAbusive ?
                    "Error: Parameters ghalat che be! Ketla aapva?" :
                    "Error: Function ni parameter ghalat che - wrong number of arguments";
            }
            if (error.includes('return')) {
                return isAbusive ?
                    "Error: Return bahar nathi aavtu chodya!" :
                    "Error: Return statement function ni bahar che";
            }
        }
        
        // Array Errors
        if (error.includes('Array') || error.includes('array') || error.includes('index')) {
            if (error.includes('out of bounds') || error.includes('range')) {
                return isAbusive ?
                    "Error: Index range ni bahar che loda!" :
                    "Error: Array index range ni bahar che - index out of bounds";
            }
            if (error.includes('list')) {
                return isAbusive ?
                    "Error: 'loda ayia nakh list' lakh be!" :
                    "Error: Array declare karo 'list' keyword sathe";
            }
            if (error.includes('bracket') || error.includes('syntax')) {
                return isAbusive ?
                    "Error: Brackets [] to use kar chodya!" :
                    "Error: Invalid array syntax - brackets [] use karo";
            }
        }
        
        // Runtime Errors
        if (error.includes('Division by zero')) {
            return isAbusive ?
                "Error: Bhos! Zero thi divide? Gaand mara!" :
                "Error: Division by zero - zero thi divide nahi thai shake";
        }
        if (error.includes('Type mismatch') || error.includes('string') && error.includes('number')) {
            return isAbusive ?
                "Error: String ne number sathe add kare che? Dimag che ke nahi?" :
                "Error: Type mismatch - string ne number sathe add nahi thai shake";
        }
        if (error.includes('Memory') || error.includes('memory')) {
            return isAbusive ?
                "Error: Memory puri thai gai chodya! Ghanu motu program lakhyo che?" :
                "Error: Memory full thai gai - program motu che";
        }
        
        // Generic error
        return isAbusive ?
            `Error: Ae loda! ${error}` :
            `Error: ${error}`;
    }

    /**
     * Main execution method
     */
    execute(code) {
        try {
            const tokens = this.tokenize(code);
            const ast = this.parse(tokens);
            const output = this.evaluate(ast);
            return {
                success: true,
                output: output,
                error: null
            };
        } catch (error) {
            const errorMessage = this.getErrorMessage(error.message, error.line);
            return {
                success: false,
                output: [],
                error: errorMessage
            };
        }
    }

    /**
     * Get syntax highlighting rules
     */
    getSyntaxHighlightingRules() {
        const keywords = this.getKeywords();
        const keywordList = Object.values(keywords).filter(k => k !== '=' && k !== '#');
        
        return {
            keywords: keywordList,
            strings: /"[^"]*"|'[^']*'/g,
            numbers: /\b\d+\.?\d*\b/g,
            comments: /#.*$/gm,
            operators: /[+\-*/=<>!&|]/g,
            variables: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g
        };
    }
}

// Create global instance
window.gujjuBhaiLangInterpreter = new GujjuBhaiLangInterpreter();
