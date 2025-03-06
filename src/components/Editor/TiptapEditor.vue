    <template>
    <div class="w-full h-full">
        <!-- Tambahkan flex agar tombol sejajar -->
        <div
        class="flex justify-start items-center bg-[#F4F7F8] p-2 space-x-[10px] rounded-md mb-14 max-[768px]:bottom-0 max-[768px]:absolute max-[768px]:mb-0 max-[768px]:left-0 max-[768px]:right-0 max-[768px]:justify-center max-[768px]:px-0 max-[768px]:p-5 max-[768px]:bg-white max-[768px]:border-t max-[768px]:border-[#EFEFEF] max-[768px]:rounded-t-md"
        >
        <DropDownButtonToolbar
            v-for="button in toolbarButtonMenu"
            :key="button.title"
            :title="button.title"
            @click="handleButtonClick(button.title)"
        >
            <template #label>
            <img :src="button.label" alt="label" class="w-[28px] h-[28px]" v-show="button.isLabelImg"></img>
            <span v-html="button.label" v-show="!button.isLabelImg"></span>
            </template>
            <template #icon>
            <img :src="button.icon" alt="icon" class="w-[28px] h-[28px]" v-show="button.icon !==false"/>
            </template>
            <template #dropdown>
            <component :is="button.dropdownComponent"></component> <!-- Gunakan komponen dropdown -->
            </template>
        </DropDownButtonToolbar>
        </div>
        <editor-content v-if="editor" :editor="editor" />
        <FloatingButtonEditor :isEditable="isEditable" @toggle="toggleEdit" :content="editorContent"/>
    </div>
    </template>

    <script>
    import { ref, defineAsyncComponent, markRaw, watch, onMounted, computed } from "vue";
    import { useEditor, EditorContent } from "@tiptap/vue-3";
    import StarterKit from "@tiptap/starter-kit";
    import Bold from "@tiptap/extension-bold";
    import FontFamily from '@tiptap/extension-font-family'
    import TextStyle from '@tiptap/extension-text-style';
    import Italic from '@tiptap/extension-italic'
    import { Color } from '@tiptap/extension-color'
    import Underline from '@tiptap/extension-underline'
    import Link from '@tiptap/extension-link'
    import TextAlign from '@tiptap/extension-text-align'
    import Placeholder from '@tiptap/extension-placeholder'
    import {FontSize} from '../../lib/FontSizeExtension.js'

    import DropDownButtonToolbar from "../Button/DropDownButtonToolbar.vue";
    import { useTextEditorStore } from "../../store/TextEditorStore.js";


    // Import dropdown komponen
    const DropdownFontSize = markRaw(defineAsyncComponent(() => import("../DropDownMenu/FontSizeDropDown.vue")));
    const DropdownFontFamily = markRaw(defineAsyncComponent(() => import("../DropDownMenu/FontFamilDropDown.vue")));
    const DropdownFontColor = markRaw(defineAsyncComponent(() => import("../DropDownMenu/FontColorDropDown.vue")));
    const DropdownAlignText = markRaw(defineAsyncComponent(() => import("../DropDownMenu/AlignTextDropDown.vue")));

    // Import assets dengan benar
    import matchCaseIcon from "../../assets/match_case_icon.svg";
    import arrowDownIcon from "../../assets/arrow_down_icon.svg";
    import italicIcon from "../../assets/italic_icon.svg";
    import boldIcon from "../../assets/bold_icon.svg";
    import formatAlignLeft from "../../assets/format_align_left.svg";
    import linkIcon from "../../assets/link_icon.svg";
    import underlineIcon from "../../assets/underline_icon.svg";

    import FloatingButtonEditor from "../Button/FloatingButtonEditor.vue";
    import { useMobileViewStore } from "../../store/MobileViewStore";

    export default {
    name: "TiptapEditor",
    props:{
        todoBody: {
            type: String,
            required: false,
            default: () => "",
        },
        isEditable: {
            type: Boolean,
            required: false,
            default: false,
        },
        toggleEdit: {
            type: Function,
            required: false,
            default: () => {},
        },
    },
    components: {
        EditorContent,
        DropDownButtonToolbar,
        FloatingButtonEditor,
    },

    setup(props) {
        const mobileViewStore = useMobileViewStore();
        const isMobileView = computed(() => mobileViewStore.isMobileView);

        const store = useTextEditorStore() 
        const editorContent = computed(() => {
            return editor.value ? editor.value.getHTML() : "";
        });
        const editor = useEditor({
        content: props.todoBody,
        editable: props.isEditable,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Tulis sesuatu...",
                includeChildren: true, // Pastikan placeholder muncul untuk elemen anak
                emptyEditorClass: "is-editor-empty", // Tambahkan class khusus untuk styling CSS
            }),
            TextStyle,
            FontFamily, 
            TextStyle, 
            FontSize,
            Bold, 
            Color,
            Italic, 
            Underline, 
            Link.configure({
                defaultProtocol: "https", // Tambahkan https jika URL tidak memiliki protokol
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        editorProps: {
            attributes: {
            class:
                "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
            },
        },
        });
        watch(
            () => props.todoBody,
            (newValue, oldValue) => {
                if (!editor.value) return;

                // Cek apakah nilai benar-benar berubah
                if (newValue !== oldValue && newValue !== editor.value.getHTML()) {
                    editor.value.commands.setContent(newValue);
                    console.log("Editor diperbarui dengan todoBody:", newValue);
                }
            },
            { immediate: true }
        );

        watch(
            () => props.isEditable,
            (newValue) => {
                if (!editor.value) return;

                // Cek apakah nilai benar-benar berubah
                if (newValue !== editor.value.isEditable) {
                    editor.value.setOptions({ editable: newValue });
                    console.log("Editor diperbarui dengan isEditable:", newValue);
                }
            },
            { immediate: true }
        );

        onMounted(() => {
            if (editor.value) {
                console.log("Editor siap digunakan!", editor.value.getHTML());
            }
        });
        watch(() => store.fontFamily, (newFontFamily) => {
            if (editor.value) {
                editor.value.chain().focus().setFontFamily(newFontFamily).run();
            }
            });
        watch(() => store.fontColor, (newFontColor) => {
            if (editor.value) {
                editor.value.chain().focus().setColor(newFontColor).run();
            }
        });
        watch(() => store.textAlign, (newTextAlign) => {
            if (editor.value) {
                editor.value.chain().focus().setTextAlign(newTextAlign).run();
            }
        });
        watch(() => store.fontSize, (newFontSize) => {
            console.log("Mengubah font size ke:", newFontSize);
            if (editor.value) {
                editor.value.chain().focus().setFontSize(`${newFontSize}px`).run();
            }
        });

        const setLink = () => {
            if (!editor.value) return;

            const previousUrl = editor.value.getAttributes("link").href;
            const url = window.prompt("Masukkan URL:", previousUrl);

            if (url === null) 
                return;

            if (url === "") {
                editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
                return;
            }

            // Tambahkan link dan ubah warna teks menjadi biru
            editor.value.chain().focus().extendMarkRange("link").setLink({ href: url }).setColor("blue").run();
        };

        const handleButtonClick = (title) => {
            if (!editor.value) return;

            if (title === "Italic") {
                editor.value.chain().focus().toggleItalic().run(); // Aktifkan atau nonaktifkan Italic
            }
            if(title === "Bold") {
                editor.value.chain().focus().toggleBold().run(); // Aktifkan atau nonaktifkan Bold
            }
            if(title === "Underline") {
                editor.value.chain().focus().toggleUnderline().run(); // Aktifkan atau nonaktifkan Underline
            }
            if(title === "Link") {
                if(editor.value.isActive("link")) {
                    editor.value.chain().focus().extendMarkRange("link").unsetLink().setColor("black").run(); // Hapus link
                } else {
                    setLink(); // Tambahkan atau hapus link
                }
            }
        };

        const toolbarButtonMenu = ref([
        {
            title: "Font Size",
            label: matchCaseIcon,
            icon: isMobileView ? false : arrowDownIcon,
            isLabelImg: true,
            dropdownComponent: DropdownFontSize,
        },
        {
            title: "Font Family",
            label: "<span class='h-[28px]'>Roboto</span>",
            icon: isMobileView ? false : arrowDownIcon,
            isLabelImg: false,
            dropdownComponent: DropdownFontFamily,
        },
        {
            title: "Font Color",
            label: "<div class='p-2 bg-black rounded-lg w-[20px] h-[20px]'></div>",
            icon: isMobileView ? false : arrowDownIcon,
            isLabelImg: false,
            dropdownComponent: DropdownFontColor,
        },
        {
            title: "Italic",
            label: "<span></span>",
            icon: italicIcon,
            isLabelImg: false,
        },
        {
            title: "Bold",
            label: "<span></span>",
            icon: boldIcon,
            isLabelImg: false,
        },
        {
            title: "Underline",
            label: "<span></span>",
            icon: underlineIcon,
            isLabelImg: false,
        },
        {
            title: "Link",
            label: "<span></span>",
            icon: linkIcon,
            isLabelImg: false,
        },
        {
            title: "Align Text",
            label: formatAlignLeft,
            icon: isMobileView ? false : arrowDownIcon,
            isLabelImg: true,
            dropdownComponent: DropdownAlignText,
        },
        ]);
        
        return { editor, toolbarButtonMenu, handleButtonClick, editorContent, isMobileView };
    },
    };
    </script>
