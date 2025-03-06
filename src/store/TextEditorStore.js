import { defineStore } from 'pinia'

export const useTextEditorStore = defineStore("textEditor",{
    state: () => ({
        fontSize: 11,
        fontFamily: 'Roboto',
        fontColor: 'black',
        textAlign: 'left',
        isItalic: false,
        isBold: false,
        isUnderline: false,
        isLink: false,
        isList: false,
    }),
    getters: {
        fontSizeString: (state) => String(state.fontSize), // Getter untuk v-model di input
      },
    actions: {
        setFontSize(fontSize) {
            this.fontSize = fontSize
        },
        setFontFamily(fontFamily) {
            this.fontFamily = fontFamily
        },
        setFontColor(fontColor) {
            this.fontColor = fontColor
        },
        setTextAlign(textAlign) {
            this.textAlign = textAlign
        },
        toggleItalic() {
            this.isItalic = !this.isItalic
        },
        toggleBold() {
            this.isBold = !this.isBold
        },
        toggleUnderline() {
            this.isUnderline = !this.isUnderline
        },
        toggleLink() {
            this.isLink = !this.isLink
        },
        toggleList() {
            this.isList = !this.isList
        }
    }
})
