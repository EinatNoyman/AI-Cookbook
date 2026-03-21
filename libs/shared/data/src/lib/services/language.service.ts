import { Injectable, signal, computed, effect } from '@angular/core';

export type Lang = 'en' | 'he';

export interface AppTranslations {
  // Nav & Shell
  navCookbook: string;
  navGuidelines: string;
  navLinks: string;
  supportedTools: string;
  skipToContent: string;
  switchToLight: string;
  switchToDark: string;
  toggleMenu: string;
  footerTagline: string;
  footerBuilt: string;
  langToggle: string;

  // Cookbook list
  cookbookTitle: string;
  cookbookSubtitles: string[];
  removeCategoryFilter: string;
  clearSearch: string;
  clearAll: string;
  resultSingular: string;
  resultPlural: string;
  resultFor: string;
  noRecipes: string;
  clearFilters: string;

  // Search bar
  searchPlaceholder: string;
  searchAriaLabel: string;

  // Filter sidebar
  categoriesHeading: string;
  allCategories: string;

  // Tool selector
  allTools: string;
  filterByPlatform: string;

  // Cookbook detail
  backToCookbook: string;
  promptSection: string;
  howToUse: string;

  // AI Tools page
  aiToolsSubtitle: string;
  tabPrompts: string;
  tabAbout: string;
  tabSetup: string;
  promptCount: string;

  // Tool overview
  strengths: string;
  limitations: string;
  whenToUse: string;
  hiddenFeatures: string;

  // Tool prompts
  filterPromptsBy: string;
  allPrompts: string;
  showLess: string;
  showMore: string;
  noPromptsInCategory: string;

  // Guidelines
  guidelinesTitle: string;
  guidelinesSubtitles: string[];
  noGuidelines: string;

  // Links
  linksTitle: string;
  linksSubtitles: string[];
  noLinks: string;

  // Empty state
  emptyMessages: Array<{ title: string; subtitle: string }>;

  // Copy button
  copied: string;
  copyToClipboard: string;
  copy: string;
  copyFailed: string;
  copySuccessMessages: string[];

  // Comment section
  commentsHeading: string;
  commentPlaceholder: string;
  commentPost: string;
  addComment: string;
  emptyComments: string[];
}

const EN: AppTranslations = {
  navCookbook: 'AI Cookbook',
  navGuidelines: 'Guidelines',
  navLinks: 'Links',
  supportedTools: 'Supported AI tools',
  skipToContent: 'Skip to content',
  switchToLight: 'Switch to light mode',
  switchToDark: 'Switch to dark mode',
  toggleMenu: 'Toggle navigation menu',
  footerTagline: 'Frontend Guild — AI Cookbook',
  footerBuilt: 'Built with Angular & Nx',
  langToggle: 'עברית',

  cookbookTitle: 'AI Cookbook',
  cookbookSubtitles: [
    "Copy-paste prompts that actually work. You're welcome.",
    'AI whispering, made easy.',
    'Prompts tested in production. By brave developers.',
    'Your secret weapon for talking to robots.',
  ],
  removeCategoryFilter: 'Remove category filter',
  clearSearch: 'Clear search',
  clearAll: 'Clear all',
  resultSingular: 'prompt',
  resultPlural: 'prompts',
  resultFor: 'for',
  noRecipes: 'No recipes for that combo. Try a different ingredient.',
  clearFilters: 'Clear filters',

  searchPlaceholder: 'Search prompts... (press / to focus)',
  searchAriaLabel: 'Search cookbook entries',

  categoriesHeading: 'Categories',
  allCategories: 'All Categories',

  allTools: 'All',
  filterByPlatform: 'Filter by AI platform',

  backToCookbook: 'Back to Cookbook',
  promptSection: 'Prompt',
  howToUse: 'How to use',

  aiToolsSubtitle: 'Proven prompts, setup guides, and tool overviews — pick your AI and start cooking.',
  tabPrompts: 'Prompts',
  tabAbout: 'About',
  tabSetup: 'Setup & Tips',
  promptCount: 'prompts',

  strengths: 'Strengths',
  limitations: 'Limitations',
  whenToUse: 'When to Use',
  hiddenFeatures: 'Features that are easy to miss but make a big difference.',

  filterPromptsBy: 'Filter prompts by category',
  allPrompts: 'All',
  showLess: 'Show less',
  showMore: 'Show more',
  noPromptsInCategory: 'No prompts in this category.',

  guidelinesTitle: 'Guidelines & Standards',
  guidelinesSubtitles: [
    'The rules we all agreed on. Yes, even you.',
    'Standards that even linters would approve of.',
    'Read these. Your PR reviewers will thank you.',
    'Consistency is the secret ingredient.',
  ],
  noGuidelines: 'No guidelines here. Anarchy reigns.',

  linksTitle: 'Developer Links',
  linksSubtitles: [
    'Your bookmarks bar wishes it was this organized.',
    'Curated links, zero browser tab guilt.',
    'Everything you need, one click away.',
    'Links so good, you might actually click them.',
  ],
  noLinks: 'No links match. Time to bookmark the void.',

  emptyMessages: [
    { title: 'Nothing here yet...', subtitle: 'But the void has potential.' },
    { title: 'Tumbleweeds...', subtitle: 'Even the crickets took the day off.' },
    { title: "It's quiet. Too quiet.", subtitle: 'Maybe try a different filter?' },
    { title: 'Zero results found', subtitle: 'The search gremlins came up empty.' },
    { title: 'Nada. Zilch. Zero.', subtitle: 'But hey, at least the UI looks nice.' },
  ],

  copied: 'Copied!',
  copyToClipboard: 'Copy to clipboard',
  copy: 'Copy',
  copyFailed: 'Failed to copy. Try selecting the text manually.',
  copySuccessMessages: [
    'Copied! Your clipboard is now smarter.',
    'Snagged it! Go paste something brilliant.',
    'Ctrl+V is ready for action.',
    'Copied — your AI tool is going to love this.',
    'Got it! That prompt is locked and loaded.',
    "Clipboard updated. You're welcome.",
    'Yoinked! Time to paste and prosper.',
    'Copy that! (pun absolutely intended)',
  ],

  commentsHeading: 'Comments',
  commentPlaceholder: 'Share a tip or thought...',
  commentPost: 'Post',
  addComment: 'Add a comment',
  emptyComments: [
    'No comments yet. Be the first!',
    'Crickets... Someone break the silence!',
    'This space is begging for your hot take.',
  ],
};

const HE: AppTranslations = {
  navCookbook: 'AI Cookbook',
  navGuidelines: 'הנחיות',
  navLinks: 'קישורים',
  supportedTools: 'כלי AI נתמכים',
  skipToContent: 'דלג לתוכן',
  switchToLight: 'מעבר למצב בהיר',
  switchToDark: 'מעבר למצב כהה',
  toggleMenu: 'פתח/סגור תפריט',
  footerTagline: 'Frontend Guild — ספר בישול AI',
  footerBuilt: 'נבנה עם Angular ו-Nx',
  langToggle: 'English',

  cookbookTitle: 'ספר בישול AI',
  cookbookSubtitles: [
    'פרומפטים שבאמת עובדים. בבקשה.',
    'לדבר עם AI — בקלות.',
    'פרומפטים שנבדקו בפרודקשן. על ידי מפתחים אמיצים.',
    'הנשק הסודי שלך לשיחה עם רובוטים.',
  ],
  removeCategoryFilter: 'הסר פילטר קטגוריה',
  clearSearch: 'נקה חיפוש',
  clearAll: 'נקה הכל',
  resultSingular: 'פרומפט',
  resultPlural: 'פרומפטים',
  resultFor: 'עבור',
  noRecipes: 'אין מתכונים לקומבינציה הזו. נסה מרכיב אחר.',
  clearFilters: 'נקה פילטרים',

  searchPlaceholder: 'חפש פרומפטים... (לחץ / למיקוד)',
  searchAriaLabel: 'חפש ערכי ספר הבישול',

  categoriesHeading: 'קטגוריות',
  allCategories: 'כל הקטגוריות',

  allTools: 'הכל',
  filterByPlatform: 'סנן לפי פלטפורמת AI',

  backToCookbook: 'חזרה לספר הבישול',
  promptSection: 'פרומפט',
  howToUse: 'איך להשתמש',

  aiToolsSubtitle: 'פרומפטים מוכחים, מדריכי התקנה וסקירות כלים — בחר את ה-AI שלך והתחל לבשל.',
  tabPrompts: 'פרומפטים',
  tabAbout: 'אודות',
  tabSetup: 'הגדרה וטיפים',
  promptCount: 'פרומפטים',

  strengths: 'יתרונות',
  limitations: 'מגבלות',
  whenToUse: 'מתי להשתמש ב',
  hiddenFeatures: 'פיצ׳רים שקל לפספס אבל עושים הבדל גדול.',

  filterPromptsBy: 'סנן פרומפטים לפי קטגוריה',
  allPrompts: 'הכל',
  showLess: 'הצג פחות',
  showMore: 'הצג יותר',
  noPromptsInCategory: 'אין פרומפטים בקטגוריה זו.',

  guidelinesTitle: 'Guidelines & Standards',
  guidelinesSubtitles: [
    'The rules we all agreed on. Yes, even you.',
    'Standards that even linters would approve of.',
    'Read these. Your PR reviewers will thank you.',
    'Consistency is the secret ingredient.',
  ],
  noGuidelines: 'No guidelines here. Anarchy reigns.',

  linksTitle: 'קישורים למפתחים',
  linksSubtitles: [
    'סרגל הסימניות שלך מקנא בסידור הזה.',
    'קישורים נבחרים, בלי אשמה על לשוניות פתוחות.',
    'כל מה שצריך, קליק אחד ממך.',
    'קישורים כל כך טובים, שאולי תלחץ עליהם.',
  ],
  noLinks: 'אין קישורים תואמים. הגיע הזמן לשמור את הריק.',

  emptyMessages: [
    { title: 'כלום כאן עדיין...', subtitle: 'אבל לריק יש פוטנציאל.' },
    { title: 'כדורי גלגולת...', subtitle: 'אפילו הצרצרים לקחו יום חופש.' },
    { title: 'שקט. שקט מדי.', subtitle: 'נסה פילטר אחר?' },
    { title: 'אפס תוצאות', subtitle: 'גמדי החיפוש חזרו בידיים ריקות.' },
    { title: 'כלום. ממש כלום.', subtitle: 'אבל לפחות ה-UI נראה טוב.' },
  ],

  copied: 'הועתק!',
  copyToClipboard: 'העתק ללוח',
  copy: 'העתק',
  copyFailed: 'העתקה נכשלה. נסה לסמן את הטקסט ידנית.',
  copySuccessMessages: [
    'הועתק! הלוח שלך חכם יותר עכשיו.',
    'תפסת! לך לדבוק משהו מבריק.',
    'Ctrl+V מוכן לפעולה.',
    'הועתק — כלי ה-AI שלך ישמח על זה.',
    'בדיוק! הפרומפט נעול וטעון.',
    'הלוח עודכן. בבקשה.',
    'חטפת! הגיע הזמן להדביק ולשגשג.',
    'קיבלתי! (כן, הכוונה כפולה.)',
  ],

  commentsHeading: 'תגובות',
  commentPlaceholder: 'שתף טיפ או מחשבה...',
  commentPost: 'פרסם',
  addComment: 'הוסף תגובה',
  emptyComments: [
    'אין תגובות עדיין. היה הראשון!',
    'שקט... מישהו ישבור את השתיקה!',
    'המקום הזה מחכה לדעה שלך.',
  ],
};

const TRANSLATIONS: Record<Lang, AppTranslations> = { en: EN, he: HE };

const CATEGORY_HE: Record<string, string> = {
  'Architecture': 'ארכיטקטורה',
  'Automation': 'אוטומציה',
  'Code Review': 'סקירת קוד',
  'DevOps': 'DevOps',
  'Documentation': 'תיעוד',
  'Migration': 'מיגרציה',
  'Performance': 'ביצועים',
  'Refactoring': 'ריפקטורינג',
  'Testing': 'בדיקות',
  'Security': 'אבטחה',
  'API': 'API',
  'Angular': 'Angular',
  '.NET': '.NET',
  'Data': 'נתונים',
  'Debugging': 'דיבאגינג',
  'Learning': 'למידה',
  'Productivity': 'פרודוקטיביות',
  'Research': 'מחקר',
};

const LANG_KEY = 'bmad-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>((localStorage.getItem(LANG_KEY) as Lang | null) ?? 'en');
  readonly t = computed(() => TRANSLATIONS[this.lang()]);

  constructor() {
    effect(() => {
      const l = this.lang();
      localStorage.setItem(LANG_KEY, l);
      document.documentElement.dir = l === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = l;
    });
  }

  toggle(): void {
    this.lang.update(l => (l === 'en' ? 'he' : 'en'));
  }

  translateCategory(category: string): string {
    if (this.lang() === 'he') {
      return CATEGORY_HE[category] ?? category;
    }
    return category;
  }
}
