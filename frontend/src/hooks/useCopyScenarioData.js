import { apiSlice } from '../api/apiSlice';

export const useCopyScenarioData = () => {
    const [copyScenario, { isLoading, isError, isSuccess }] = apiSlice.useCopyScenarioDataMutation();

    const copyData = async (scenarioId, newScenarioData) => {
        await copyScenario({ id: scenarioId, data: newScenarioData }).unwrap();
    };

    return { copyData, isLoading, isError, isSuccess };
};
