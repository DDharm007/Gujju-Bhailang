# Gujju-BhaiLang 🚀

A toy programming language inspired by Gujarati culture and the way Gujarati speakers naturally mix English with their native language. Built with JavaScript and featuring two distinct coding modes: "Sado Code" (Simple) and "Maja Vado Code" (Abusive).

![Gujju-BhaiLang Logo](logo.png)

## 🌟 Features

- **Two Coding Modes**: Switch between clean syntax and attitude-filled coding
- **Gujarati Keywords**: Romanized Gujarati keywords for authentic cultural experience
- **Interactive Playground**: Real-time code execution with syntax highlighting
- **Error Messages**: Culturally flavored error messages in both modes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Aggressive neon aesthetic with pure black background

## 🎯 Language Modes

### Sado Code (Simple Mode)
Clean, straightforward syntax for beginners and professional use.

```gujju-bhailang
start:
  print: "Kem cho bhai!"
  umar = 25
  jo (umar > 18) to {
    print: "Tame adult cho"
  }
end:
```

### Maja Vado Code (Abusive Mode)
Attitude-filled syntax with Gujarati slang and personality.

```gujju-bhailang
sharu:
  lakh chodya: "Kem cho loda!"
  loda ayia nakh umar = 25
  jo (umar > 18) to {
    lakh chodya: "Bhos, tame mota cho"
  }
samaapt:
```

## 📚 Language Syntax

### Keywords Mapping

| Feature | Sado Code | Maja Vado Code |
|---------|-----------|----------------|
| Program start | `start:` | `sharu:` |
| Program end | `end:` | `samaapt:` |
| Print | `print:` | `lakh chodya:` |
| Variable | `variableName =` | `loda ayia nakh variableName =` |
| If | `jo` | `jo` |
| Then | `to {` | `to {` |
| Else | `nahi to {` | `nahi to {` |
| Repeat | `repeat X vaar {` | `repeat X vaar {` |
| List/Array | `list name =` | `loda ayia nakh list name =` |
| Function | `function name()` | `function name()` |
| Comment | `# comment` | `# comment` |

### Data Types

- **Numbers**: `25`, `100.5`
- **Strings**: `"text"` or `'text'`
- **Booleans**: `true`, `false`
- **Arrays**: `["item1", "item2", "item3"]`

### Operators

- **Arithmetic**: `+`, `-`, `*`, `/`, `%`
- **Comparison**: `>`, `<`, `==`, `!=`, `>=`, `<=`
- **Logical**: `and`, `or`, `not`
- **Assignment**: `=`

## 🚀 Getting Started

### Installation

```bash
npm i -g gujju-bhailang
```

### Usage

1. **Open the Website**: Navigate to the Gujju-BhaiLang website
2. **Choose Mode**: Toggle between "Sado Code" and "Maja Vado Code"
3. **Write Code**: Use the interactive playground to write your code
4. **Execute**: Click "Run Code" to see the output

### Example Programs

#### Hello World
```gujju-bhailang
# Simple Mode
start:
  print: "Kem cho bhai!"
end:

# Abusive Mode
sharu:
  lakh chodya: "Kem cho loda!"
samaapt:
```

#### Conditional Logic
```gujju-bhailang
# Simple Mode
start:
  umar = 25
  jo (umar > 18) to {
    print: "Tame adult cho"
  } nahi to {
    print: "Tame balak cho"
  }
end:

# Abusive Mode
sharu:
  loda ayia nakh umar = 25
  jo (umar > 18) to {
    lakh chodya: "Bhos, tame mota cho"
  } nahi to {
    lakh chodya: "Chodya balak"
  }
samaapt:
```

#### Loops
```gujju-bhailang
# Simple Mode
start:
  repeat 5 vaar {
    print: "Maja ma che"
  }
end:

# Abusive Mode
sharu:
  repeat 5 vaar {
    lakh chodya: "Maja avi gai chodya"
  }
samaapt:
```

#### Functions
```gujju-bhailang
# Simple Mode
start:
  function bolavo(naam) {
    print: "Kem cho " + naam
  }
  bolavo("Bhai")
end:

# Abusive Mode
sharu:
  function loda_bolavo(naam) {
    lakh chodya: "Kem cho loda " + naam
  }
  loda_bolavo("Bhai")
samaapt:
```

#### Arrays
```gujju-bhailang
# Simple Mode
start:
  list mitro = ["Ram", "Shyam", "Mohan"]
  print: mitro[0]
  print: "Total mitro: " + mitro.length
end:

# Abusive Mode
sharu:
  loda ayia nakh list lodo = ["Ram", "Shyam", "Mohan"]
  lakh chodya: lodo[0]
  lakh chodya: "Total lodo: " + lodo.length
samaapt:
```

## 🎨 Design Features

### Color Palette
- **Background**: Pure black `#000000`
- **Primary Text**: White `#FFFFFF`
- **Neon Accents**:
  - Cyan: `#00FFFF`
  - Magenta: `#FF10F0`
  - Neon Green: `#39FF14`
  - Electric Blue: `#0080FF`
  - Orange/Red: `#FF4500`

### Typography
- **Code**: Consolas (monospace)
- **UI Text**: Poppins (Google Fonts)
- **Icons**: Font Awesome

### Effects
- Glow effects on neon elements
- Smooth animations and transitions
- Hover effects with lift animations
- Syntax highlighting with neon colors

## 🛠️ Technical Details

### Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Interpreter**: Custom JavaScript-based interpreter
- **Lexer**: Tokenizes code into meaningful units
- **Parser**: Builds Abstract Syntax Tree (AST)
- **Evaluator**: Executes the AST and produces output

### File Structure
```
gujju-bhailang/
├── index.html              # Landing page with documentation
├── playground.html         # Interactive compiler page
├── style.css              # Main stylesheet for both pages
├── app.js                 # Main JavaScript for UI interactions
├── interpreter.js         # Language interpreter/parser/lexer
├── logo.png              # Logo image file
└── README.md             # Project documentation
```

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🎯 Error Messages

### Sado Code Mode (Simple)
- `Error: Syntax gadbad che! Missing '{' after 'to'`
- `Error: Variable 'naam' declare nathi - variable not declared`
- `Error: 'jo' ni condition ni jarur che - condition required after 'jo'`

### Maja Vado Code Mode (Abusive)
- `Error: Ae loda! Syntax gadbad che! '{' kyan che?`
- `Error: Loda 'naam' declare j nathi karyu! Pehla declare kar`
- `Error: 'jo' pachhi condition to lakh chodya!`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**DDharm007**
- GitHub: [@DDharm007](https://github.com/DDharm007)
- Project: [Gujju-BhaiLang](https://github.com/DDharm007/gujju-bhailang)

## 🙏 Acknowledgments

- Inspired by [Bhailang.js.org](https://bhailang.js.org/)
- Gujarati community for cultural inspiration
- JavaScript community for technical guidance

## 🎉 Fun Facts

- Gujju-BhaiLang celebrates the unique way Gujarati speakers code
- The language supports both professional and playful coding styles
- Error messages are culturally flavored and educational
- Built entirely in JavaScript - no external dependencies for the core interpreter

---

**Made with ❤️ and lots of attitude by @DDharm007**

*Coding Bhai Style - Where Code Meets Attitude!* 🚀
