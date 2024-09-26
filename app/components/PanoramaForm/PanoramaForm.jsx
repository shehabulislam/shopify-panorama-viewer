import { Box, Button, Card, Checkbox, ChoiceList, Form, FormLayout, TextField } from '@shopify/polaris';
import UnitControl from '../fields/UnitControl';

export default function PanoramaForm({handleSubmit, data, handleChange, isLoading}){


    return <>
        <Card gap="20px">
            <FormLayout>
                <Form onSubmit={handleSubmit}>
                    
                    <TextField label="Title" value={data.title} onChange={(value) => handleChange('title', value)} /><br />

                    <ChoiceList
                        title="Type"
                        choices={[
                            {label: 'Image', value: 'image'},
                            {label: 'Video', value: 'video'},
                        ]}
                        inline={true}
                        selected={data.type || 'image'}
                        onChange={(value) => handleChange('type', value)}
                    /><br />

                    {/* <ImageUploadZone /> */}
                    <TextField label="Image Src" value={data.img_src} onChange={(value) => handleChange('img_src', value)} /><br />
                    
                    <UnitControl label="Width" onChange={(value) => handleChange('width', value)} value="500px" /><br />
                        
                    <UnitControl label="Height" onChange={(value) => handleChange('height', value)} value="500px" /><br />
                        
                    <Checkbox
                        label="Auto Rotate"
                        checked={data.autoRotate}
                        onChange={(value) => handleChange('autoRotate', value)}
                    /><br />
                    
                    <Checkbox
                        label="Auto Hide Control"
                        checked={data.hideDefaultControl}
                        onChange={(value) => {
                            console.log('value', value);
                            handleChange('hideDefaultControl', value)
                        }}
                    /><br />
                     
                        
                    <Box style={{display: 'flex', justifyContent: 'end',marginTop: '50px' }}>
                        <Button loading={isLoading} fullWidth type="submit" submit variant='primary'>Create</Button>
                    </Box>
                </Form>
            </FormLayout>
        </Card>
    </>
}