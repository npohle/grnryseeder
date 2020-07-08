import React, {useContext } from 'react';
import { Form } from "react-final-form";
import { Box, Button } from "@material-ui/core";
import { TextInput} from "react-admin";
import { APIContext } from "./APIContext";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SelectInput } from 'react-admin';

export const GenerateContextForm = ({
    displayedFilters,
    filterValues,
    setFilters,
    hideFilter,
    open
  }) => {

    const context = useContext(APIContext);

    const onSubmit = values => {
      if (Object.keys(values).length > 0) {
        context.setVerb(values.verb);
        context.setMode(values.mode);
        context.setUrl(values.url);
        context.setDelaymin(values.delaymin);
        context.setDelaymax(values.delaymax);
        context.setBodytemplate(values.bodytemplate);
      }
    };
    
  return (
      <div style={{"width": "80%", "marginBottom": "7px"}}>
        <Form onSubmit={onSubmit} initialValues={{"delay":"0", "verb": context.verb, "mode": context.mode, "headers": context.headers, "url": context.url, "delaymin": context.delaymin, "delaymax": context.delaymax, "bodytemplate": context.bodytemplate}} style={{"paddingTop": "24px", "marginTop": "0px"}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{"paddingTop": "24px", "marginTop": "0px"}}>

              <ExpansionPanel style={{"width": "100%"}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Endpoint</ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  <Box display="flex" flexDirection="row" alignItems="flex-end" width={"100%"}>
                    
                    <Box display="flex" flexDirection="column" alignItems="flex-start" width={"100%"}>

                      <Box display="flex" flexDirection="row" justifyContent="space-between" width={"100%"}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" >
                            <SelectInput source="verb" label="Verb" choices={[{ id: 'POST', name: 'POST' }, { id: 'GET', name: 'GET' }]} style={{marginRight: 10}} />
                            <SelectInput source="mode" label="Mode" choices={[{ id: 'cors', name: 'cors' }, { id: 'no-cors', name: 'no-cors' }, { id: 'same-origin', name: 'same-origin' }, { id: 'navigate', name: 'navigate' }]} />
                        </Box>

                        <Box display="flex" flexDirection="row" justifyContent="flex-end" >
                            <TextInput resettable={false} helperText={false} source="delaymin" label="Min Delay" style={{width: 150, marginRight: 10}}/>
                            <TextInput resettable={false} helperText={false} source="delaymax" label="Max Delay" style={{width: 150}} />
                        </Box>
                      </Box>

                      <Box display="flex" flexDirection="row" alignItems="flex-start" width={"100%"}>
                            <TextInput resettable={false} helperText={false} source="url" label="HTTP URL" fullWidth={true} />
                      </Box>

                      <Box display="flex" flexDirection="row" justifyContent="space-between" width={"100%"}>
                        
                        <Box component="span" flexGrow="1" mr={1}>
                            <TextInput
                                resettable={false}
                                helperText={false}
                                multiline
                                rowsMin={4}
                                source="bodytemplate"
                                label="Body Template"
                                fullWidth={true}
                                inputProps={{style: {fontSize: 10, lineHeight: 1.2, fontFamily: "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New"}}}
                              />
                          </Box>

                          <Box component="span" flexGrow="1" ml={1}>
                            <TextInput
                                    resettable={false}
                                    helperText={false}
                                    multiline
                                    rows={4}
                                    source="headers"
                                    label="Request Headers"
                                    fullWidth={true}
                                    inputProps={{style: {fontSize: 10, lineHeight: 1.2, fontFamily: "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New"}}}
                                />
                          </Box>

                        </Box>
                      </Box>
                      
                      <Box component="span" mr={2} >
                            <Button color="primary" size="small" type="submit">Apply</Button>
                      </Box>

                    </Box>

                  </ExpansionPanelDetails>
                </ExpansionPanel>

            </form>
          )}
        </Form>
      </div>
    );
  };
