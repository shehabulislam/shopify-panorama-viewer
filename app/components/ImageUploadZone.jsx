import {DropZone, LegacyStack, Thumbnail, Text, Box} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';
// import { ResourcePicker } from '@shopify/app-bridge-react';

export default function ImageUploadZone() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const handleMediaSelection = (resources) => {
    const selectedMedia = resources.selection;
    console.log('Selected media:', selectedMedia);
  };

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{padding: '0'}}>
      <Box vertical>
        {files.map((file, index) => (
          <Box alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteIcon
              }
            />
            <div>
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </Box>
        ))}
      </Box>
    </div>
  );

  return (
    <>
    {/* <ResourcePicker
        resourceType="Media"
        open={mediaPickerOpen}
        onSelection={(resources) => {
          handleMediaSelection(resources);
          setMediaPickerOpen(false);
        }}
        onCancel={() => setMediaPickerOpen(false)}
        allowMultiple
      /> */}
    
    <DropZone onDrop={handleDropZoneDrop}>
         
      {uploadedFiles}
      {fileUpload}
    </DropZone>
    </>
  );
}