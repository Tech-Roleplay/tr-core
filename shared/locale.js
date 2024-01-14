/**
 * Locale class for managing translation phrases and localization.
 * 
 * Allows defining translation phrases, falling back to other locales, 
 * interpolating phrase substitutions, and managing current locale.
 * 
 * Can be extended, cleared, replaced, checked for phrase existence,
 * and deleted.
 */
class Locale {
    /**
     * Locale class constructor.
     * @param {Object} opts - Options
     * @param {Object} opts.fallbackLang - Fallback language
     * @param {boolean} opts.warnOnMissing - Whether to warn on missing phrases
     * @param {Object} opts.phrases - Phrases to initialize with
    */
    constructor(opts) {
        this.fallback = opts.fallbackLang && new Locale({
            warnOnMissing: false,
            phrases: opts.fallbackLang.phrases,
        }) || false;
        this.warnOnMissing = typeof opts.warnOnMissing !== 'boolean' && true || opts.warnOnMissing;
        this.phrases = {};
        this.extend(opts.phrases || {});
    }

    /**
     * Extends the current phrases with the provided phrases. 
     * Handles prefixing keys and recursively extending nested phrase objects.
     * @param {Object} phrases - Object containing phrases to extend
     * @param {string} [prefix] - Optional prefix to add to phrase keys 
    */
    extend(phrases, prefix) {
        for (let key in phrases) {
            let phrase = phrases[key];
            let prefixKey = prefix && `${prefix}.${key}` || key;
            if (typeof phrase === 'object') {
                this.extend(phrase, prefixKey);
            } else {
                this.phrases[prefixKey] = phrase;
            }
        }
    }

    /**
     * Clears all phrases from the Locale instance by setting 
     * the phrases property to an empty object.
     */
    clear() {
        this.phrases = {};
    }

    /**
     * Replaces the current phrases with the provided phrases object. 
     * Clears existing phrases, then extends with the new phrases.
     * @param {Object} phrases - Phrases object to replace existing phrases
    */
    replace(phrases) {
        phrases = phrases || {};
        this.clear();
        this.extend(phrases);
    }

    /**
     * Sets the current locale if a new locale is provided, 
     * and returns the current locale instance.
     * @param {Locale} [newLocale] - New locale instance to set as current
     * @returns {Locale} Current locale instance
    */
    locale(newLocale) {
        if (newLocale) {
            this.currentLocale = newLocale;
        }
        return this.currentLocale;
    }

    /**
     * Translates the phrase for the given key, performing string substitution using provided substitution values.
     * @param {string} key - The key for the phrase to translate 
     * @param {Object} [subs] - Optional substitution values to replace placeholders in the translated string
     * @returns {string} The translated string with substitutions applied
    */
    t(key, subs) {
        let phrase, result;
        subs = subs || {};
        if (typeof this.phrases[key] === 'string') {
            phrase = this.phrases[key];
        } else {
            if (this.warnOnMissing) {
                console.log(`^3Warning: Missing phrase for key: "${key}"`);
            }
            if (this.fallback) {
                return this.fallback.t(key, subs);
            }
            result = key;
        }
        if (typeof phrase === 'string') {
            result = translateKey(phrase, subs);
        }
        return result;
    }

    /**
     * Checks if a phrase for the given key exists.
     * @param {string} key - The key to check for existence
     * @returns {boolean} True if a phrase for the key exists, false otherwise
    */
    has(key) {
        return this.phrases[key] !== undefined;
    }

    /**
     * Deletes phrase translations from the locale's phrase list. 
     * If a string is passed, deletes the phrase with that key.
     * If an object is passed, recursively deletes phrases for each key/value pair.
     * @param {string|Object} phraseTarget - String key of phrase to delete, or nested object containing phrase keys/values to delete
     * @param {string} [prefix] - Optional prefix to prepend to each key being deleted 
     */
    delete(phraseTarget, prefix) {
        if (typeof phraseTarget === 'string') {
            delete this.phrases[phraseTarget];
        } else {
            for (let key in phraseTarget) {
                let phrase = phraseTarget[key];
                let prefixKey = prefix && `${prefix}.${key}` || key;
                if (typeof phrase === 'object') {
                    this.delete(phrase, prefixKey);
                } else {
                    delete this.phrases[prefixKey];
                }
            }
        }
    }
}
  
/**
 * Replaces template placeholders %{key} in the given phrase string 
 * with values from the given substitution map.
 * 
 * @param {string} phrase - The phrase containing %{key} placeholders
 * @param {Object} [subs] - Object mapping keys to substitution values 
 * @returns {string} The phrase string with placeholders replaced by substitution values
*/
function translateKey(phrase, subs) {
    if (typeof phrase !== 'string') {
        throw new TypeError('TypeError: translateKey function expects arg #1 to be a string');
    }
    if (!subs) {
        return phrase;
    }
    let result = phrase;
    for (let k in subs) {
        let templateToFind = `%{${k}}`;
        result = result.replace(new RegExp(templateToFind, 'g'), String(subs[k]));
    }
    return result;
}
  
  
  