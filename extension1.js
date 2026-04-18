(function(Scratch) {
    class TurkishWordExtension {
        constructor() {
            this.root = "";
            this.suffix = "";
            this.score = 0;
        }

        getInfo() {
            return {
                id: 'turkishWord',
                name: 'Türkçe Kelime',
                blocks: [
                    {
                        opcode: 'setRoot',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'kök ayarla [ROOT]',
                        arguments: {
                            ROOT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'göz'
                            }
                        }
                    },
                    {
                        opcode: 'setSuffix',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'ek ayarla [SUFFIX]',
                        arguments: {
                            SUFFIX: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'lük'
                            }
                        }
                    },
                    {
                        opcode: 'makeWord',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'kelimeyi oluştur'
                    },
                    {
                        opcode: 'checkWord',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'doğru mu?'
                    },
                    {
                        opcode: 'getScore',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'puan'
                    }
                ]
            };
        }

        setRoot(args) {
            this.root = args.ROOT;
        }

        setSuffix(args) {
            this.suffix = args.SUFFIX;
        }

        makeWord() {
            return this.root + this.suffix;
        }

        checkWord() {
            const lastVowel = this.getLastVowel(this.root);

            if ("eiöü".includes(lastVowel)) {
                if (this.suffix === "lük") {
                    this.score += 10;
                    return true;
                }
            } else {
                if (this.suffix === "lık") {
                    this.score += 10;
                    return true;
                }
            }

            this.score -= 5;
            return false;
        }

        getScore() {
            return this.score;
        }

        getLastVowel(word) {
            const vowels = "aeıioöuü";
            for (let i = word.length - 1; i >= 0; i--) {
                if (vowels.includes(word[i])) {
                    return word[i];
                }
            }
            return "";
        }
    }

    Scratch.extensions.register(new TurkishWordExtension());
})(Scratch);
