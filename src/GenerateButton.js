import React, {useState, useContext, useRef} from 'react';
import { useCreate, Button } from 'react-admin';
import { useDataProvider, useNotify, useRedirect, useRefresh } from 'react-admin';
import { APIContext } from "./APIContext";

export const GenerateButton = ({ record, resource}) => {

    const running = useRef(false);
    const [label, setLabel] = useState("Start Generate");

    const context = useContext(APIContext);

    const notify = useNotify();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();

    const toggleGenerator = function() {
        if (!running.current) {
            running.current = true;
            setLabel("Stop Generate");
            generate();
        } else {
            running.current = false;
            setLabel("Start Generate");
        }
    }

    const generate = function(){

        if (running.current) {
            const delay = Math.random() * (context.delaymax - context.delaymin) + context.delaymin ;
            console.log("Delay: "+delay);
            setTimeout(generate, delay);
        }

        return dataProvider
            .create(resource, {'upload':'pending'})
            .then(response => {
                refresh();
                const id = response.data.id;
                var data = response.data;
                var url = eval('`'+context.url+'`');
                var body = eval('`'+context.bodytemplate+'`');
                var headers = JSON.parse(eval('`'+context.headers+'`'));

                fetch(url, {method: context.verb, mode: context.mode, headers: headers, body: body})
                    .then(response => {
                        dataProvider
                            .update(resource, { id: id, data: { upload: response.status} })
                            .then(response => {refresh();})
                        }
                    ).catch(function(error) {
                        console.log(error);
                    });
            })
            .catch(error => { notify(`Creation error: ${error.message}`, 'warning');});
    }

    return <Button label={label} onClick={toggleGenerator} />;
};