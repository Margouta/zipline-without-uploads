import { useConfig } from '@/components/ConfigProvider';
import { eitherTrue } from '@/lib/primitive';
import { isAdministrator } from '@/lib/role';
import { useUserStore } from '@/lib/store/user';
import { Group, SimpleGrid, Title } from '@mantine/core';
import SettingsAvatar from './parts/SettingsAvatar';
import SettingsDashboard from './parts/SettingsDashboard';
import SettingsFileView from './parts/SettingsFileView';
import SettingsGenerators from './parts/SettingsGenerators';
import SettingsMfa from './parts/SettingsMfa';
import SettingsOAuth from './parts/SettingsOAuth';
import SettingsServerActions from './parts/SettingsServerUtil';
import SettingsUser from './parts/SettingsUser';
import SettingsExports from './parts/SettingsExports';
import SettingsSessions from './parts/SettingsSessions';

export default function DashboardSettings() {
  const config = useConfig();
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Group gap='sm'>
        <Title order={1}>Settings</Title>
      </Group>

      <SimpleGrid mt='md' cols={{ base: 1, md: 2 }} spacing='lg'>
        {isAdministrator(user?.role) && <SettingsUser />}

        <SettingsAvatar />

        <SettingsSessions />

        {isAdministrator(user?.role) && {config.features.oauthRegistration && <SettingsOAuth />} />}

        <SettingsDashboard />

        {isAdministrator(user?.role) && <SettingsFileView />}

        {eitherTrue(config.mfa.totp.enabled, config.mfa.passkeys) && <SettingsMfa />}

        {isAdministrator(user?.role) && <SettingsGenerators />

        {isAdministrator(user?.role) && <SettingsExports />

        {isAdministrator(user?.role) && <SettingsServerActions />}
      </SimpleGrid>
    </>
  );
}
