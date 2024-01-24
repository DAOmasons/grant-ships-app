import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Stack, TextInput, Textarea } from '@mantine/core';

import { FormPageLayout } from '../../layout/FormPageLayout';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';
import { AvatarPickerIPFS } from '../../components/AvatarPickerIPFS';
import { notifications } from '@mantine/notifications';
import { AddressBox } from '../../components/AddressBox';

import { useForm, zodResolver } from '@mantine/form';
import { FormEvent, useEffect } from 'react';
import { registerProjectSchema } from './validationSchemas/registerProjectSchema';
import { z } from 'zod';

type FormValues = z.infer<typeof registerProjectSchema>;

export const RegisterProject = () => {
  const form = useForm({
    initialValues: {
      avatarHash: '',
      name: '',
      teamMembers: [''],
      description: '',
      email: '',
      x: '',
      github: '',
      discord: '',
      telegram: '',
    },
    validate: zodResolver(registerProjectSchema),
  });
  const handleFormSubmit = (
    values: FormValues,
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    const res = form.validate();
    console.log('res', res);
    console.log('values', values);
  };

  const handleBlur = (fieldName: string) => {
    form.validateField(fieldName);
  };

  const hasErrors = Object.keys(form.errors).length > 0;
  return (
    <FormPageLayout
      title="Register Project Profile"
      disableSubmit={hasErrors}
      onSubmit={form.onSubmit((values, e) => handleFormSubmit(values, e))}
      primaryBtn={{
        label: 'Create Project',
        onClick: () => {
          console.log('create project');
        },
      }}
      secondaryBtn={{
        label: 'Back',
        onClick: () => {
          console.log('go back');
        },
      }}
      backBtn={{
        label: 'Back',
        onClick: () => {
          console.log('go back');
        },
      }}
    >
      <AvatarPickerIPFS
        onUploadSuccess={(hash: string) => {
          notifications.show({
            title: 'IPFS Image Uploaded',
            message: `IPFS Hash: ${hash}`,
          });
          form.setFieldValue('avatarHash', hash);
        }}
        onUploadError={(errMsg: string) => {
          notifications.show({
            title: 'IPFS Upload Error',
            message: errMsg,
            color: 'red',
          });
        }}
        validationError={form.errors.avatarHash}
      />

      <TextInput
        w="100%"
        label="Project Name"
        required
        placeholder="Project Name"
        {...form.getInputProps('name')}
      />
      <AddressBox
        w="100%"
        label="Team Members"
        description="Paste addresses here. Must be comma separated."
        placeholder="Paste here"
        {...form.getInputProps('teamMembers')}
        onBlur={() => handleBlur('teamMembers')}
        formSetValue={(addresses: string[]) => {
          form.setFieldValue('teamMembers', addresses);
        }}
      />
      <Textarea
        w="100%"
        label="Short Project Description"
        description="Max 350 characters"
        required
        autosize
        minRows={4}
        maxRows={8}
        placeholder="Project Description"
        {...form.getInputProps('description')}
        onBlur={() => handleBlur('description')}
      />
      <Stack w="100%" gap={14}>
        <TextInput
          w="100%"
          label="Links/Contact"
          description="Email is required. Please provide at least one other contact "
          placeholder="Email"
          required
          leftSection={<IconMail />}
          {...form.getInputProps('email')}
          onBlur={() => handleBlur('email')}
        />
        <TextInput
          w="100%"
          placeholder="X"
          leftSection={<IconBrandX />}
          {...form.getInputProps('x')}
          onBlur={() => handleBlur('x')}
        />
        <TextInput
          w="100%"
          placeholder="Github"
          leftSection={<IconBrandGithub />}
          {...form.getInputProps('github')}
          onBlur={() => handleBlur('github')}
        />
        <TextInput
          w="100%"
          placeholder="Discord"
          leftSection={<IconBrandDiscord />}
          {...form.getInputProps('discord')}
          onBlur={() => handleBlur('discord')}
        />
        <TextInput
          w="100%"
          placeholder="Telegram"
          leftSection={<IconBrandTelegram />}
          {...form.getInputProps('telegram')}
          onBlur={() => handleBlur('telegram')}
        />
      </Stack>
    </FormPageLayout>
  );
};
