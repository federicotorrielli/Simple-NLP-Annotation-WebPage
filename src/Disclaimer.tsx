import React from "react";

function Disclaimer() {
    return (
        <div>
            <div className="text-4xl font-bold">Basic or Advanced?</div>
            <div>
                <div className="text-2xl mt-4">Scope of this annotation task</div>
                <p className="mt-2">
                    The goal of this annotation is to define a <b>gold standard</b> for basic/advanced <b>words</b>.
                </p>
                <div className="text-2xl mt-4">What are you going to do?</div>
                <p className="mt-2">
                    In this annotation task, you will be given a word to evaluate. Your job is
                    to decide whether the word is basic or advanced.
                </p>
                <p className="mt-2">
                    You will need to complete <b>500</b> of these <b>annotations</b>, which should take about <b>30
                    minutes</b>. It's important to note that this task
                    does not evaluate your knowledge of English, so you don't need to worry about being tested. If
                    you need more information about the word, you can use the internet to help
                    you. The goal of this task is simply to help us understand how people classify words as basic or
                    advanced. At any point during the annotation task, you can mark a word as "<i>difficult</i>" if you
                    find it challenging to determine whether it is basic or advanced.
                </p>
                <div className="text-2xl mt-4">What are basic and advanced words?</div>
                <p className="mt-2">
                    <b>There is no precise and objective definition of what a basic word is.</b> However, there are
                    some general characteristics that most people would agree on. Here's a few:
                </p>
                <ul className="mt-2 list-decimal">
                    <li>Basic words are <b>tools for social survival</b>: they are the Swiss army knife for
                        second-language-learners (useful for a lot of social interactions between non-native speakers)
                    </li>
                    <li>They are usually <b>short and easy to say</b> and to conceptualize</li>
                    <li>They are the <b>first words that come to mind</b> when speaking about a certain topic</li>
                    <li>They can be <b>easily translated to a clear mental image</b></li>
                </ul>
                <p className="mt-2">
                    Given the definitions above, an advanced word for a concept is a term that is <b>not basic</b>.
                </p>
            </div>
        </div>
    );
}

export default Disclaimer;
